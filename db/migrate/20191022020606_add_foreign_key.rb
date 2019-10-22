class AddForeignKey < ActiveRecord::Migration[5.0]
  def change
    add_foreign_key :messages, :groups
    add_foreign_key :messages, :users
  end
end
