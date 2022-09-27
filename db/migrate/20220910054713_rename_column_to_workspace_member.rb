class RenameColumnToWorkspaceMember < ActiveRecord::Migration[7.0]
  def change
    rename_column :workspace_members, :user_id, :profile_id
  end
end
