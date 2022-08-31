class WorkspaceSerializer < ActiveModel::Serializer
  attributes :workspace_id, :name, :owner_user_id, :created_at
end
