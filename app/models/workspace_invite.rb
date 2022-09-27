class WorkspaceInvite < ApplicationRecord
    belongs_to :workspace, foreign_key: "workspace_id"
end
