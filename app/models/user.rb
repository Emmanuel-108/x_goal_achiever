class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  has_many :tasks
  has_many :subtasks, through: :tasks

  # Code to include a user_id in the Statistics table
  # has_many :submitted_statistics, class_name: "Statistic", foreign_key: :user_id

  has_many :statistics, as: :input
end
