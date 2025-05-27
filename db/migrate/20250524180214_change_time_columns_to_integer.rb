class ChangeTimeColumnsToInteger < ActiveRecord::Migration[7.1]
  def change
    change_column :tasks, :time, :integer, using: 'extract(epoch from time)/60'
    change_column :subtasks, :time, :integer, using: 'extract(epoch from time)/60'
  end
end
