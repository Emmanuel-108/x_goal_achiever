class Statistic < ApplicationRecord
  belongs_to :user
  belongs_to :input, polymorphic: true

  before_validation :assign_defaults

  validates :input_rating, :input_status, presence: true, if: -> { input_type == "Task" }

  private

  def assign_defaults
    if input_type == "Task"
      self.input_rating ||= 5
      self.input_status ||= "Completed"
    end
  end
end
