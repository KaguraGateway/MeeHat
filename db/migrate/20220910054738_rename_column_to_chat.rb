class RenameColumnToChat < ActiveRecord::Migration[7.0]
  def change
    rename_column :chats, :user_id, :profile_id
  end
end
