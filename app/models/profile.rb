class Profile < ApplicationRecord
    belongs_to :user
    has_many :workspaces
    has_many :workspace_members, dependent: :destroy
end
