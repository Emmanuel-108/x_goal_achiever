class Task < ApplicationRecord
  belongs_to :user
  has_many :subtasks, dependent: :destroy
  accepts_nested_attributes_for :subtasks, allow_destroy: true
  has_many :statistics, as: :input
end
