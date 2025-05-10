class Task < ApplicationRecord
  belongs_to :user
  has_many :subtasks, dependent: :destroy
  has_many :statistics, as: :input
end
