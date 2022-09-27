class ApiController < ApplicationController
    # CSRF SKIP（時間がないので暫定）
    skip_before_action :verify_authenticity_token
    # Must Login
    before_action :authenticate_user!

    def create_profile
        post_body = JSON.parse(request.body.read)

        if !post_body.blank?
            profile = Profile.new(
                user_id: current_user.id,
                email: post_body["email"],
                is_display_email: post_body["is_display_email"],
                phone_number: post_body["phone_number"],
                profile_name: post_body["profile_name"],
                profile_comments: post_body["profile_comments"],
            )

            # 一回保存してProfileIDを生成する（この後のプロフィール画像の行程で必要のため）
            profile.save

            if !post_body["profile_img_data_url"].blank?
                profile.attach_profile_img(post_body["profile_img_data_url"])
                profile.is_custom_profile_img = true
                profile.save
            end

            render json: profile, method: [:profile_img_url]
        else
            render json: {status => 500, message => "Error"}
        end
    end

    def get_profiles
        profiles = Profile.where(user_id: current_user.id)
        render json: ActiveModel::Serializer::CollectionSerializer.new(
            profiles, each_serializer: ProfileSerializer, current_user: current_user
        ).to_json
    end

    def get_workspaces
        workspaces = current_user.get_joined_workspaces
        render json: ActiveModel::Serializer::CollectionSerializer.new(
            workspaces, each_serializer: WorkspaceSerializer, include: [:channels]
        ).to_json
    end

    def create_workspace
        post_body = JSON.parse(request.body.read)
        p "post_body: #{post_body}"

        if post_body.blank?
            render json: {status => 500, message => "Error"}
        end

        # Profileを取得
        profile = current_user.get_profile(post_body["owner_profile_id"])

        # ProfileIDをユーザーが持っているか？
        if !profile.blank?
            # Workspaceを作成
            workspace = Workspace.new(name: post_body["name"], owner_profile_id: post_body["owner_profile_id"])
            workspace.save
            # Workspaceに「一般」チャンネルを追加
            channel = workspace.create_channel(channel_name: "一般", channel_type: "text_channel", visibility: "public_channel")
            # Workspaceに参加
            profile.join_workspace(workspace.id)
            # Channelに参加
            profile.join_channel(channel.id)

            render json: workspace
        else
            render json: {status => 403, message => "Invalid ProfileID"}
        end
    end

    def get_workspace
        workspace = Workspace.find(params[:workspace_id])
        render json: workspace
    end

    def delete_workspace
        workspace = Workspace.find(params[:workspace_id])
        workspace.destroy
        render json: {status => 200, message => "Success"}
    end

    def join_workspace
        post_body = JSON.parse(request.body.read)
        p "post_body: #{post_body}"

        # 招待コードを取得
        invite = Invite.find_by(invite_code: post_body["invite_code"])

        # プロファイルを取得
        profile = current_user.get_profile(post_body["profile_id"])
        # ワークスペースに参加
        profile.join_workspace(invite.workspace.id)
        # 全てのチャンネルに参加
        invite.workspace.channels.each do |channel|
            if channel.visibility == "public_channel"
                profile.join_channel(channel.id)
            end
        end

        render json: workspace
    end

    def leave_workspace
        workspace_member = WorkspaceMember.find_by(workspace_id: params[:workspace_id], user_id: current_user.id)
        workspace_member.destroy
        render json: {status => 200, message => "Success"}
    end

    def join_workspace
        post_body = JSON.parse(request.body.read)
        p "post_body: #{post_body}"

        # 招待コードを取得
        invite = WorkspaceInvite.find_by(invite_code: post_body["invite_code"])

        # プロファイルを取得
        profile = current_user.get_profile(post_body["profile_id"])
        # ワークスペースに参加
        profile.join_workspace(invite.workspace.id)
        # 全てのチャンネルに参加
        invite.workspace.channels.each do |channel|
            if channel.visibility == "public_channel"
                profile.join_channel(channel.id)
            end
        end

        render json: invite.workspace
    end

    def create_invite
        # 招待コードを生成
        invite_code = SecureRandom.hex(12)
        invite = WorkspaceInvite.new(invite_code: invite_code, workspace_id: params[:workspace_id])
        invite.save

        render json: invite
    end

    def get_channels
        channels = Channel.all
        render json: ActiveModel::Serializer::CollectionSerializer.new(
            channels, each_serializer: ChannelSerializer
        ).to_json
    end

    def create_channel
        post_body = JSON.parse(request.body.read)
        p "post_body: #{post_body}"

        if post_body.blank?
            render json: {status => 500, message => "Error"}
            return
        end

        # ワークスペース取得
        workspace = Workspace.find(params[:workspace_id])
        # ワークスペースにユーザーが参加しているか？
        profile = workspace.get_profile_by_user_id(current_user.id)
        if profile.blank?
            render status: 403, json: {message: "Not Member"}
            return
        end

        # チャンネル作成
        channel = workspace.create_channel(channel_name: post_body["name"], channel_type: post_body["channel_type"], visibility: post_body["visibility"])
        # チャンネル参加
        profile.join_channel(channel.id)

        if channel.visibility == "public_channel"
            workspace.workspace_members.each do |member|
                if member.id != profile.id
                    member.profile.join_channel(channel.id)
                end
            end
        end

        render json: channel
    end

    def get_channel
        channel = Channel.find(params[:channel_id])
        render json: channel
    end

    def delete_channel
        channel = Channel.find(params[:channel_id])
        channel.destroy
        render json: {status => 200, message => "Success"}
    end


    def get_messages
        chats = Chat.where(channel_id: params[:channel_id])
        render json: ActiveModel::Serializer::CollectionSerializer.new(
            chats, each_serializer: ChatSerializer
        ).to_json
    end

    def create_message
        post_body = JSON.parse(request.body.read)
        p "post_body: #{post_body}"

        if post_body.blank?
            render json: {status => 500, message => "Error"}
        end

        # チャンネルを取得
        channel = Channel.find(params[:channel_id].to_i)
        if channel.blank?
            render json: {status => 404, message => "Channel not found"}
        end

        # このチャンネルに参加しているプロフィールを取得
        profile = channel.get_member(current_user.id)

        if !profile.blank?
            chat = Chat.new(channel_id: params[:channel_id], profile_id: profile.profile_id, content: post_body["content"])
            chat.save

            render json: chat
            WorkspaceChannel.broadcast_message(channel.workspace.workspace_id, ChatSerializer.new(chat))
        else
            render json: {status => 403, message => "Not Member"}
        end
    end

    def delete_message
        # メッセージを取得
        chat = Chat.find(params[:message_id])
        p chat

        # 自身がメッセージの投稿者か確認
        # TODO: ワークスペースに参加しているかを確認する（これだとワークスペース抜けた後でもメッセージを消せる）
        if !chat.blank? || current_user.is_self_profile?(chat.author.profile_id)
            chat.destroy!
            render json: {status => 200, message => "Success"}
        else
            render json: {status => 403, message => "You don't have Permissions"}
        end
    end

    def patch_message
        post_body = JSON.parse(request.body.read)
        p "post_body: #{post_body}"

        # メッセージを取得
        chat = Chat.find(params[:message_id])
        p chat

        # 自身がメッセージの投稿者か確認
        # TODO: ワークスペースに参加しているかを確認する（これだとワークスペース抜けた後でもメッセージを変えれる）
        if !post_body.blank? || !post_body["content"].blank? || !chat.blank? || current_user.is_self_profile?(chat.author.profile_id)
            chat.content = post_body["content"]
            chat.save
            render json: chat
        else
            render json: {status => 403, message => "You don't have Permissions"}
        end
    end
end
