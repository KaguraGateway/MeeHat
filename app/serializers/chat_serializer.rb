class ChatSerializer < ActiveModel::Serializer
  attributes :chat_id, :channel_id, :profile_id, :created_at, :updated_at, :content
end
