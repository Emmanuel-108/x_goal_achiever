class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  has_many :tasks
  has_many :subtasks, through: :tasks
  has_one_attached :photo

  # Code to include a user_id in the Statistics table
  # has_many :submitted_statistics, class_name: "Statistic", foreign_key: :user_id

  has_many :statistics, as: :input

  validates :first_name, :last_name, :date_of_birth, presence: true
  validates :email, format: { with: /\A.*@.*\.com\z/, message: "must be a valid .com address" }
  validates :gender, presence: true, inclusion: { in: ["Male", "Female", "Other"], message: "%{value} is not a valid gender" }
end
