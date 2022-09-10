class RenameColumnToChannelMembers < ActiveRecord::Migration[7.0]
  def change
    rename_column :channel_members, :user_id, :profile_id
  end
end
