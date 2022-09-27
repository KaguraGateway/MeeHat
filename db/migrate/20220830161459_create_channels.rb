class CreateChannels < ActiveRecord::Migration[7.0]
  def change
    create_table :channels, primary_key: "channel_id", id: :bigint, auto_increment: true, default: nil, force: true do |t|
      t.string :name, default: nil, force: true
      t.integer :type, default: nil, force: true
      t.integer :visibility, default: nil, force: true
      t.timestamps
    end

    add_index :channels, :channel_id
    add_index :channels, :name
  end
end
