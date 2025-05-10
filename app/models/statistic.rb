class Statistic < ApplicationRecord
  belongs_to :user
  belongs_to :input, polymorphic: true
end
