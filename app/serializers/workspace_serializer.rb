class WorkspaceSerializer < ActiveModel::Serializer
  attributes :workspace_id, :name, :owner_profile_id, :created_at

  has_many :channels
end
