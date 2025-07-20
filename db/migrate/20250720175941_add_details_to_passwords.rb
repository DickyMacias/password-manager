class AddDetailsToPasswords < ActiveRecord::Migration[7.2]
  def change
    add_column :passwords, :website, :string
    add_column :passwords, :notes, :text
  end
end
