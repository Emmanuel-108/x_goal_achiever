# app/controllers/tasks_controller.rb

class TasksController < ApplicationController
  before_action :set_task, only: [:show, :edit, :update, :destroy]

  def index
    # @tasks = Task.all
    @tasks = current_user.tasks.includes(:subtasks)

    @chart_data = Task.group_by_day(:created_at, last: 7)
                      .count
                      .map { |date, count| [date.strftime("%A"), count] }
                      .to_h
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
