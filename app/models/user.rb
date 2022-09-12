class User < ApplicationRecord
    has_many :profiles

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable, :confirmable

  def is_self_profile?(profile)
    profile.user_id == self.id
  end

  def is_self_profile?(profile_id)
    self.profiles.find(profile_id).nil?
  end
end
