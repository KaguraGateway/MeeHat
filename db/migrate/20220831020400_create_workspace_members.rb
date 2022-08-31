class CreateWorkspaceMembers < ActiveRecord::Migration[7.0]
  def change
    create_table :workspace_members, id: false, primary_key: %w(workspace_id user_id) do |t|
      t.bigint :workspace_id, null: false
      t.bigint :user_id, null: false
      t.timestamps
    end
  end
end
