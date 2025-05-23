require 'faker'

puts "🧹 Cleaning up old data..."
Statistic.delete_all
Subtask.delete_all
Task.delete_all
User.where(id: 1).destroy_all

# Create a test user
puts "👤 Creating test user..."
user = User.create!(
  id: 1,
  email: "test@test.com",
  password: "123123",
  first_name: "admin",
  last_name: "tester",
  date_of_birth: "2003-11-07 14:23:45",
  gender: "male"
)

today = Time.zone.now.beginning_of_day

puts "📊 Generating statistics over the past 7 days..."
(0..6).each do |i|
  day = today - i.days

  3.times do
    task_time = day + rand(8..18).hours

    task = Task.create!(
      name: Faker::Lorem.sentence(word_count: 3),
      description: Faker::Lorem.paragraph,
      time: task_time,
      user_id: user.id
    )

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

    rand(2..4).times do
      subtask_time = task_time + rand(0..2).hours
      subtask = Subtask.create!(
        name: Faker::Lorem.sentence(word_count: 2),
        description: Faker::Lorem.paragraph,
        time: subtask_time,
        task_id: task.id
      )

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
end

puts "✅ Done!"
