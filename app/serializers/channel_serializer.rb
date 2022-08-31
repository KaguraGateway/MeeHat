class ChannelSerializer < ActiveModel::Serializer
  attributes :channel_id, :name, :created_at, :type, :visibility
end
