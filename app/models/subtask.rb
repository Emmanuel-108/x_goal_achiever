class Subtask < ApplicationRecord
  belongs_to :task
  has_many :statistics, as: :input
end
