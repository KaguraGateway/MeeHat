class Chat < ApplicationRecord
    belongs_to :author, class_name: "Profile", foreign_key: "profile_id"
    belongs_to :channel, foreign_key: "channel_id"
end
