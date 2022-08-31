class ChatSerializer < ActiveModel::Serializer
  attributes :chat_id, :channel_id, :user_id, :created_at, :updated_at, :content
end
