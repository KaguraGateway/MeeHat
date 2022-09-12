class Workspace < ApplicationRecord
    belongs_to :profile
    has_many :workspace_members, dependent: :destroy
    has_many :channels, dependent: :destroy
end
