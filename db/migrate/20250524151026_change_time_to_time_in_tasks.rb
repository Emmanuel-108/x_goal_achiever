class ChangeTimeToTimeInTasks < ActiveRecord::Migration[7.1]
  def change
    change_column :tasks, :time, :time
  end
end
