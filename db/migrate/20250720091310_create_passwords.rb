class CreatePasswords < ActiveRecord::Migration[7.2]
  def change
    create_table :passwords do |t|
      t.string :service_url
      t.string :username
      t.string :password_digest

      t.timestamps
    end
  end
end
