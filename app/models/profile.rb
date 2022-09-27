class Profile < ApplicationRecord
    include Rails.application.routes.url_helpers

    belongs_to :user, foreign_key: "user_id"
    has_many :workspace_members, dependent: :destroy
    has_many :channel_members, dependent: :destroy

    has_many :workspaces, through: :workspace_members
    has_many :channels, through: :channel_members
    has_many :chats

    has_one_attached :profile_img

    def join_workspace(workspace_id)
        @workspace_member = WorkspaceMember.new(workspace_id: workspace_id, profile_id: self.profile_id)
        @workspace_member.save
    end

    def join_channel(channel_id)
        @channel_member = ChannelMember.new(channel_id: channel_id, profile_id: self.profile_id)
        @channel_member.save
    end

    def profile_img_url
        self.profile_img.attached? ? url_for(self.profile_img) : nil
    end

    def attach_profile_img(profile_img_data_url)
        image_blob = ImageBlob.new(profile_img_data_url)
        self.profile_img.attach(
            io: image_blob.to_io,
            filename: self.profile_id,
            content_type: image_blob.mime_type
        )
    end

    def association_workspace_ids
        self.workspace_members.pluck(:workspace_id)
    end
end
