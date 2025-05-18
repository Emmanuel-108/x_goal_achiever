class Contact < ApplicationRecord
  validates :full_name, presence: true
  validates :message, length: { minimum: 40, message: "must be at least 40 characters long" }
  validates :email, format: { with: /\A.*@.*\.com\z/, message: "must be a valid .com address" }
end
