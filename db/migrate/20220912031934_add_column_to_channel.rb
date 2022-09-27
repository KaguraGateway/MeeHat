class AddColumnToChannel < ActiveRecord::Migration[7.0]
  def change
    add_column :channels, :workspace_id, :bigint
  end
end
