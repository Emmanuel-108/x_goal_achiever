module StatisticsHelper
  def focus_minutes(task)
    task.time.to_i
  end
end
