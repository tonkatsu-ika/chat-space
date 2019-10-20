class RenameGroupColumnToGroups < ActiveRecord::Migration[5.0]
  def change
    rename_column :groups, :group, :name
  end
end
