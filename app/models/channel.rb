class Channel < ApplicationRecord
    belongs_to :workspace, foreign_key: "workspace_id"
    has_many :channel_members, dependent: :destroy

    has_many :chat, dependent: :destroy

    attribute :channel_type, :integer
    attribute :visibility, :integer

    enum channel_type: {
        text_channel: 0,
        voice_channel: 1,
    }
    enum visibility: {
        public_channel: 0,
        participation_channel: 1,
        private_channel: 2
    }

    def get_member(user_id)
        # メンバーを取得
        channel_member_profile_ids = ChannelMember.where(channel_id: self.id).pluck(:profile_id)
        # ProfileとUserを照合
        Profile.find_by(profile_id: channel_member_profile_ids, user_id: user_id)
    end
end
