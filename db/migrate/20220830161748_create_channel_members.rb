class CreateChannelMembers < ActiveRecord::Migration[7.0]
  def change
    create_table :channel_members, id: false, primary_key: %w(channel_id user_id) do |t|
      t.bigint :channel_id, null: false
      t.bigint :user_id, null: false
      t.timestamps
    end

    add_index :channel_members, :channel_id
    add_index :channel_members, :user_id
  end
end
