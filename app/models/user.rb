class User < ApplicationRecord
  has_many :profiles

  has_many :workspace_members, through: :profiles
  has_many :channel_members, through: :profiles

  has_many :workspaces, through: :workspace_members
  has_many :channels, through: :channel_members

  has_many :chats, through: :profiles

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

  # 自分の持っているプロフィールからしか取得できない
  def get_profile(profile_id)
    self.profiles.find(profile_id)
  end

  # 自分の参加している全ワークスペースを返す
  def get_joined_workspaces
    self.profiles.map { |profile| profile.workspace_members.map { | member | member.workspace } }.flatten
  end

  # 自分がワークスペースに参加しているかどうかを返す
  def is_joined_workspace?(workspace_id)
    self.profiles.map { | member | member.workspace.id == workspace_id }.flatten.any?
  end

  # 自分の参加している全チャンネルを返す
  def get_channels
    self.profiles.map { |profile| profile.channel_members.map { | member | member.channel } }.flatten
  end
end
