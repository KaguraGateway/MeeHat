class AddContentColumnToChat < ActiveRecord::Migration[7.0]
  def change
    add_column :chats, :content, :string
  end
end
