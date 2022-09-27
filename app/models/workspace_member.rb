class WorkspaceMember < ApplicationRecord
    belongs_to :workspace
    belongs_to :profile, foreign_key: "profile_id"
end
