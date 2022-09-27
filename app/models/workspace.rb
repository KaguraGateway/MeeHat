class Workspace < ApplicationRecord
    belongs_to :profile, foreign_key: "owner_profile_id"
    has_many :workspace_members, dependent: :destroy
    has_many :channels, dependent: :destroy
    has_many :workspace_invites, dependent: :destroy

    belongs_to :profile

    def create_channel(channel_name:, channel_type:, visibility:)
        Channel.create!({name: channel_name, channel_type: channel_type, visibility: visibility, workspace_id: self.id})
    end

    def get_channel(channel_id)
        self.channels.find(channel_id)
    end

    # ユーザーIDからこのワークスペースに参加しているプロフィールを取得する
    def get_profile_by_user_id(user_id)
        member_profile_ids = WorkspaceMember.where(workspace_id: self.id).pluck(:profile_id)
        Profile.find_by(profile_id: member_profile_ids, user_id: user_id)
    end
end
