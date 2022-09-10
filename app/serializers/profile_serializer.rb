class ProfileSerializer < ActiveModel::Serializer
  attributes :profile_id, :profile_name, :is_custom_profile_img, :profile_comments, :notification_status, :custom_status_emoji, :custom_status_text
end
