class Task < ApplicationRecord
  belongs_to :user
  has_many :subtasks, dependent: :destroy
  accepts_nested_attributes_for :subtasks, allow_destroy: true
  has_many :statistics, as: :input
  attr_accessor :distribution

  before_save :assign_time_distribution

  private

  def assign_time_distribution
    return if subtasks.blank? || time.blank? || distribution.blank?

    distribute_time!(time, distribution)
  end

  public

  def distribute_time!(total_time, distribution_type)
    count = subtasks.size
    return if count.zero? || total_time.zero?

    times =
      case distribution_type
      when "even"
        Array.new(count, total_time / count)
      when "incremental"
        base = total_time / (count * (count + 1) / 2.0)
        (1..count).map { |i| (base * i).round }
      when "decremental"
        base = total_time / (count * (count + 1) / 2.0)
        (1..count).to_a.reverse.map { |i| (base * i).round }
      when "random"
        randoms = Array.new(count) { rand }
        sum = randoms.sum
        randoms.map { |r| (r / sum * total_time).round }
      else
        Array.new(count, 0)
      end

    times = times[0, count]
    times += [0] * (count - times.size) if times.size < count

    subtasks.each_with_index do |subtask, index|
      # subtask.time = times[index].minutes.from_now
      # subtask.time = (Time.current + times[index].minutes).strftime("%H:%M:%S")
      minutes = times[index]
      # subtask.time = "%02d:%02d:00" % [minutes / 60, minutes % 60]
      subtask.time = minutes
      subtask.save
    end
  end
end
