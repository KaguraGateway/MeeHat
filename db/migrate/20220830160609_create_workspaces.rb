class CreateWorkspaces < ActiveRecord::Migration[7.0]
  def change
    create_table :workspaces, primary_key: "workspace_id", id: :bigint, auto_increment: true, default: nil, force: true do |t|
      t.string :name, default: nil, force: true
      t.bigint :owner_user_id, default: nil, force: true
      t.timestamps
    end

    add_index :workspaces, :workspace_id
    add_index :workspaces, :name
    add_index :workspaces, :owner_user_id
  end
end
