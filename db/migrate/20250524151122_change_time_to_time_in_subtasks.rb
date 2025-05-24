class ChangeTimeToTimeInSubtasks < ActiveRecord::Migration[7.1]
  def change
    change_column :subtasks, :time, :time
  end
end
