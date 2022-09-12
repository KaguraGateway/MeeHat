class WorkspaceMember < ApplicationRecord
    belongs_to :workspace
    belongs_to :profile
end
