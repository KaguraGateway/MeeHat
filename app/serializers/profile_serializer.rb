class ProfileSerializer < ActiveModel::Serializer
  attributes :profile_id, :profile_name, :profile_comments, :notification_status, :custom_status_emoji, :custom_status_text, :profile_img_url
  attributes :association_workspace_ids

  def association_workspace_ids
    if instance_options[:current_user] != nil && instance_options[:current_user].id == object.user_id
      object.association_workspace_ids
    end
  end
end
