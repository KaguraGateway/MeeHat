# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2022_09_10_054738) do
  create_table "channel_members", id: false, charset: "utf8mb4", collation: "utf8mb4_unicode_ci", force: :cascade do |t|
    t.bigint "channel_id", null: false
    t.bigint "profile_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["channel_id"], name: "index_channel_members_on_channel_id"
    t.index ["profile_id"], name: "index_channel_members_on_profile_id"
  end

  create_table "channels", primary_key: "channel_id", charset: "utf8mb4", collation: "utf8mb4_unicode_ci", force: :cascade do |t|
    t.string "name"
    t.integer "type"
    t.integer "visibility"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["channel_id"], name: "index_channels_on_channel_id"
    t.index ["name"], name: "index_channels_on_name"
  end

  create_table "chats", primary_key: "chat_id", charset: "utf8mb4", collation: "utf8mb4_unicode_ci", force: :cascade do |t|
    t.bigint "channel_id"
    t.bigint "profile_id"
    t.boolean "is_attachments", default: false
    t.boolean "is_embed", default: false
    t.bigint "replay_to_chat_id"
    t.bigint "thread_origin_chat_id"
    t.boolean "is_thread_released", default: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "content"
    t.index ["channel_id"], name: "index_chats_on_channel_id"
    t.index ["chat_id"], name: "index_chats_on_chat_id"
    t.index ["created_at"], name: "index_chats_on_created_at"
    t.index ["profile_id"], name: "index_chats_on_profile_id"
  end

  create_table "profiles", primary_key: "profile_id", charset: "utf8mb4", collation: "utf8mb4_unicode_ci", force: :cascade do |t|
    t.bigint "user_id"
    t.string "email"
    t.boolean "is_display_email", default: false
    t.string "phone_number"
    t.string "profile_name"
    t.boolean "is_custom_profile_img", default: false
    t.string "profile_comments"
    t.bigint "notification_status"
    t.string "custom_status_emoji"
    t.string "custom_status_text"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", charset: "utf8mb4", collation: "utf8mb4_unicode_ci", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "confirmation_token"
    t.datetime "confirmed_at"
    t.datetime "confirmation_sent_at"
    t.string "unconfirmed_email"
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  create_table "workspace_members", id: false, charset: "utf8mb4", collation: "utf8mb4_unicode_ci", force: :cascade do |t|
    t.bigint "workspace_id", null: false
    t.bigint "profile_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "workspaces", primary_key: "workspace_id", charset: "utf8mb4", collation: "utf8mb4_unicode_ci", force: :cascade do |t|
    t.string "name"
    t.bigint "owner_profile_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["name"], name: "index_workspaces_on_name"
    t.index ["owner_profile_id"], name: "index_workspaces_on_owner_profile_id"
    t.index ["workspace_id"], name: "index_workspaces_on_workspace_id"
  end

end
