class Password < ApplicationRecord
  has_many :user_passwords
  has_many :users, through: :user_passwords
end
