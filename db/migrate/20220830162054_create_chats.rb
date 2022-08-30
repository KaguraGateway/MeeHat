class CreateChats < ActiveRecord::Migration[7.0]
  def change
    create_table :chats, primary_key: "chat_id", id: :bigint, auto_increment: true, default: nil, force: true do |t|
      t.bigint :channel_id, default: nil, force: true
      t.bigint :user_id, default: nil, force: true
      t.boolean :is_attachments, default: false, force: true
      t.boolean :is_embed, default: false, force: true
      t.bigint :replay_to_chat_id, default: nil, force: true
      t.bigint :thread_origin_chat_id, default: nil, force: true
      t.boolean :is_thread_released, default: false, force: true
      t.timestamps
    end

    add_index :chats, :chat_id
    add_index :chats, :channel_id
    add_index :chats, :user_id
    add_index :chats, :created_at
  end
end
