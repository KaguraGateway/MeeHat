class CreateWorkspaceInvites < ActiveRecord::Migration[7.0]
  def change
    create_table :workspace_invites do |t|
      t.string :invite_code, null: false
      t.bigint :workspace_id, null: false
      t.timestamps
    end

    add_index :workspace_invites, :invite_code,                unique: true
    add_index :workspace_invites, :workspace_id
  end
end
