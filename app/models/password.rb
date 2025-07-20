class Password < ApplicationRecord
  has_many :user_passwords
  has_many :users, through: :user_passwords

  # Campos obligatorios
  validates :username, presence: true
  validates :password_digest, presence: true

  # Encriptación de campos sensibles
  encrypts :username, deterministic: true
  encrypts :password_digest
  encrypts :website, deterministic: true
  encrypts :service_url, deterministic: true
  encrypts :notes
end
