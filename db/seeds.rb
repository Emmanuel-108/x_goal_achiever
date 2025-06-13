require 'faker'

puts "🧹 Cleaning up old data..."
Statistic.delete_all
Subtask.delete_all
Task.delete_all
# User.where(id: 1).destroy_all
User.destroy_all

# Create a test user
puts "👤 Creating test user..."
user = User.create!(
  email: "test@test.com",
  password: "123123",
  first_name: "Admin",
  last_name: "User",
  date_of_birth: "2000-01-01",
  gender: "Male"
)

today = Time.zone.now.beginning_of_day

puts "📊 Generating statistics over the past 7 days..."
(0..6).each do |i|
  day = today - i.days

  rand(3..10).times do
    task_time = (rand(10..60).minutes / 60)
    creation_time = day + rand(8..18).hours
    nouns = %w[
      Homework Exercise Gym Code Cook Read Nap Work Groceries Write
      Email Laundry Meeting Cleaning Shopping Study Project Call Plan
      Report Presentation Research Exercise Meditation Walk Sleep
      Shopping Bills Errands Gardening Maintenance
    ]

    task = Task.create!(
      name: "#{Faker::Verb.base.capitalize} #{nouns.sample}",
      description: Faker::Company.catch_phrase + ".",
      time: task_time,
      user_id: user.id,
      created_at: creation_time,
      updated_at: creation_time
    )

    Statistic.create!(
      user_id: user.id,
      start_time: creation_time,
      end_time: creation_time + task_time,
      input_type: "Task",
      input_id: task.id,
      input_status: %w[Incomplete Completed].sample,
      input_rating: rand(1..5),
      input_performance: rand(50..100)
    )

    rand(2..4).times do
      verbs = %w[Do Create Execute Deliver Finish Plan Review Check Write Submit]
      subtask_time = (rand(5..40).minutes / 60)
      creation_time_s = creation_time + subtask_time
      subtask = Subtask.create!(
        name: "To #{verbs.sample}",
        description: Faker::Hacker.say_something_smart,
        time: subtask_time,
        task_id: task.id,
        created_at: creation_time_s,
        updated_at: creation_time_s
      )

      Statistic.create!(
        user_id: user.id,
        start_time: creation_time_s,
        end_time: creation_time_s + subtask_time,
        input_type: "Subtask",
        input_id: subtask.id,
        input_status: %w[Incomplete Completed].sample,
        input_rating: rand(1..5),
        input_performance: rand(50..100)
      )
    end
  end
end

puts "✅ Done!"

puts "🧪 Creating demo task with 10 seconds duration..."

demo_task = Task.create!(
  name: "Breathe",
  description: "Breathe air before beginning a long task.",
  time: 1,
  user_id: user.id,
  created_at: Time.zone.now,
  updated_at: Time.zone.now
)

puts "🎯 Demo task created: #{demo_task.name} with time #{demo_task.time} seconds"
