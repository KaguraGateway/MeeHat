class ChannelMember < ApplicationRecord
    belongs_to :channel, foreign_key: "channel_id"
    belongs_to :profile, foreign_key: "profile_id"
end
