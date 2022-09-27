class ChannelSerializer < ActiveModel::Serializer
  attributes :channel_id, :name, :created_at, :channel_type, :visibility, :workspace_id
end
