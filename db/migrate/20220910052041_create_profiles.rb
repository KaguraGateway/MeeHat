class CreateProfiles < ActiveRecord::Migration[7.0]
  def change
    create_table :profiles, primary_key: "profile_id", id: :bigint, auto_increment: true, default: nil, force: true do |t|
        t.bigint :user_id, default: nil, force: true
        t.string :email, default: nil, force: true
        t.boolean :is_display_email, default: false, force: true
        t.string :phone_number, default: nil, force: true
        t.string :profile_name, default: nil, force: true
        t.boolean :is_custom_profile_img, default: false, force: true
        t.string :profile_comments, default: nil, force: true
        t.bigint :notification_status, default: nil, force: true
        t.string :custom_status_emoji, default: nil, force: true
        t.string :custom_status_text, default: nil, force: true
        t.timestamps
    end
  end
end
