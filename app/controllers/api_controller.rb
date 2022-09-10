class ApiController < ApplicationController
    # CSRF SKIP
    skip_before_action :verify_authenticity_token

    def create_profile
        post_body = JSON.parse(request.body.read)
        p "post_body: #{post_body}"

        if !post_body.blank?
            @profile = Profile.new(
                user_id => current_user.id,
                email => post_body["email"],
                is_display_email => post_body["is_display_email"],
                phone_number => post_body["phone_number"],
                profile_name => post_body["profile_name"],
                is_custom_profile_img => post_body["is_custom_profile_img"],
                profile_comments => post_body["profile_comments"],
                notification_status => post_body["notification_status"],
            )
            @profile.save
            render json: @profile
        else
            render json: {status => 500, message => "Error"}
        end
    end

    def get_workspaces
        @workspaces = Workspace.all
        render json: ActiveModel::Serializer::CollectionSerializer.new(
            @workspaces, each_serializer: WorkspaceSerializer
        ).to_json
    end

    def create_workspace
        post_body = JSON.parse(request.body.read)
        p "post_body: #{post_body}"

        if !post_body.blank?
            @workspace = Workspace.new(name => post_body["name"], owner_user_id => current_user.id)
            @workspace.save
            render json: @workspace
        else
            render json: {status => 500, message => "Error"}
        end
    end

    def get_workspace
        @workspace = Workspace.find(params[:id])
        render json: @workspace
    end

    def delete_workspace
        @workspace = Workspace.find(params[:id])
        @workspace.destroy
        render json: {status => 200, message => "Success"}
    end

    def join_workspace
        @workspace = Workspace.find(params[:id])
        @workspace_member = WorkspaceMember.new(workspace_id: @workspace.id, user_id: current_user.id)
        @workspace_member.save
        render json: {status => 200, message => "Success"}
    end

    def leave_workspace
        @workspace_member = WorkspaceMember.find_by(workspace_id: params[:id], user_id: current_user.id)
        @workspace_member.destroy
        render json: {status => 200, message => "Success"}
    end

    def get_channels
        @channels = Channel.all
        render json: ActiveModel::Serializer::CollectionSerializer.new(
            @channels, each_serializer: ChannelSerializer
        ).to_json
    end

    def create_channel
        post_body = JSON.parse(request.body.read)
        p "post_body: #{post_body}"

        if !post_body.blank?
            @channel = Channel.new(post_body)
            @channel.save
            render json: @channel
        else
            render json: {status => 500, message => "Error"}
        end
    end

    def get_channel
        @channel = Channel.find(params[:id])
        render json: @channel
    end

    def delete_channel
        @channel = Channel.find(params[:id])
        @channel.destroy
        render json: {status => 200, message => "Success"}
    end


    def get_messages
        @chats = Chat.where(channel_id: params[:channel_id])
        render json: ActiveModel::Serializer::CollectionSerializer.new(
            @chats, each_serializer: ChatSerializer
        ).to_json
    end

    def create_message
        post_body = JSON.parse(request.body.read)
        p "post_body: #{post_body}"

        if !post_body.blank?
            @chat = Chat.new(channel_id: params[:channel_id], user_id: current_user.id, content: post_body["content"])
            @chat.save
            render json: @chat
        else
            render json: {status => 500, message => "Error"}
        end
    end
end
