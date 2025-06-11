class Subtask < ApplicationRecord
  belongs_to :task
  has_many :statistics, as: :input

  validates :name, :time, presence: true
end
