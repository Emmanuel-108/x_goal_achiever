require 'faker'

# Ensure user exists
user = User.find_or_create_by!(id: 1) do |u|
  u.email = "test@test.com"
  u.password = "123123"
  u.first_name = "admin"
  u.last_name = "tester"
  u.date_of_birth = "2003-11-07 14:23:45"
  u.gender = "male"
end

# Get today's date
today = Time.zone.now.beginning_of_day

# Create 10 tasks for today
10.times do
  task_time = today + rand(8..18).hours # Random time between 8 AM and 6 PM today

  task = Task.create!(
    name: Faker::Lorem.sentence(word_count: 3),
    description: Faker::Lorem.paragraph,
    time: task_time,
    user_id: user.id
  )

  # Create statistics for the task
  Statistic.create!(
    user_id: user.id,
    start_time: task_time - 1.hour,
    end_time: task_time,
    input_type: "Task",
    input_id: task.id,
    input_status: %w[pending completed in_progress].sample,
    input_rating: rand(1..5),
    input_performance: rand(50..100)
  )

  # Create 2–5 subtasks for each task
  rand(2..5).times do
    subtask_time = task_time + rand(0..2).hours # After or around task time

    subtask = Subtask.create!(
      name: Faker::Lorem.sentence(word_count: 2),
      description: Faker::Lorem.paragraph,
      time: subtask_time,
      task_id: task.id
    )

    # Create statistics for the subtask
    Statistic.create!(
      user_id: user.id,
      start_time: subtask_time - 30.minutes,
      end_time: subtask_time,
      input_type: "Subtask",
      input_id: subtask.id,
      input_status: %w[pending completed in_progress].sample,
      input_rating: rand(1..5),
      input_performance: rand(50..100)
    )
  end
end
