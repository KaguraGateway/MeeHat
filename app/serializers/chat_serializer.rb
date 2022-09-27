class ChatSerializer < ActiveModel::Serializer
  attributes :chat_id, :channel_id, :created_at, :updated_at, :content
  has_many :author, serializer: ProfileSerializer
end
