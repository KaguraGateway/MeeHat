class ChangeColumnToWorkspace < ActiveRecord::Migration[7.0]
  def change
    rename_column :workspaces, :owner_user_id, :owner_profile_id
  end
end
