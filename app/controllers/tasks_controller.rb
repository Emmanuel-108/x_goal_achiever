# app/controllers/tasks_controller.rb

class TasksController < ApplicationController
  before_action :set_task, only: [:show, :edit, :update, :destroy]

  def index
    @tasks = Task.all

    @chart_data = Task.group_by_day(:created_at, last: 7)
                      .count
                      .map { |date, count| [date.strftime("%A"), count] }
                      .to_h

    # @chart_data = Task.group_by_day(:created_at, last: 7, time_zone: Time.zone.name)
    #               .count
    #               .each_with_object(Hash.new(0)) do |(date, count), result|
    #                 weekday = date.strftime("%A")
    #                 result[weekday] += count
    #               end

    # # Ensure all weekdays are represented in correct order
    # ordered_weekdays = %w[Monday Tuesday Wednesday Thursday Friday Saturday Sunday]

    # @chart_data = ordered_weekdays.index_with { |day| @chart_data[day] || 0 }



    # # Get last 7 days dates including today, descending (today first, then yesterday, etc.)
    # dates = (0..6).map { |i| Time.zone.today - i.days }

    # # Group tasks by day for last 7 days
    # counts_by_date = Task.group_by_day(:created_at, range: dates.last.beginning_of_day..dates.first.end_of_day, time_zone: Time.zone.name).count

    # # Map dates to weekday names with counts, summing if multiple same weekdays occur (since 7 days span more than one week)
    # weekday_counts = Hash.new(0)
    # dates.each do |date|
    #   weekday = date.strftime("%A")
    #   count = counts_by_date[date.beginning_of_day] || 0
    #   weekday_counts[weekday] += count
    # end

    # Build ordered hash from today backward (no duplicates because dates are unique)
    # ordered_weekdays = dates.map { |d| d.strftime("%A") }.uniq

    # @chart_data = ordered_weekdays.index_with { |day| weekday_counts[day] || 0 }

  end

  def show
  end

  def new
    @task = Task.new
    3.times { @task.subtasks.build }
  end

  def create
    @task = current_user.tasks.new
    @task.assign_attributes(task_params)
    @task.distribution = params[:distribution]
    @task.distribute_time!(@task.time.to_i, @task.distribution) if @task.time.present? && @task.distribution.present?

    if @task.save
      redirect_to new_task_statistic_path(@task), notice: "Task and subtasks successfully added! 📝"
    else
      render :new, status: :unprocessable_entity
    end
  end

  def edit
  end

  def update
    if @task.update(task_params)
      redirect_to @task
    else
      render :edit, status: :unprocessable_entity
    end
  end

  def destroy
    if @task.user_id == current_user.id
      @task_id = @task.id # utile pour le turbo stream
      @task.destroy
      respond_to do |format|
        format.turbo_stream
        format.html { redirect_to tasks_path, notice: "Task successfully deleted! 📋" }
      end
    else
      respond_to do |format|
        format.turbo_stream { head :unauthorized }
        format.html { redirect_to tasks_path, alert: "You don't have permission to delete this task." }
      end
    end
  end

  private

  def set_task
    @task = Task.find(params[:id])
  end

  def task_params
    params.require(:task).permit(
      :name,
      :description,
      :time,
      :distribution,
      subtasks_attributes: [:name, :description, :time, :_destroy]
    )
  end
end
