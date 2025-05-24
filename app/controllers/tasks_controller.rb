# class TasksController < ApplicationController
#   # before_action :set_task, only: [:show, :edit, :update, :destroy]

#   def index
#     @tasks = Task.all
#   end

#   def show
#     @task = Task.find(params[:id])
#   end

#   def new
#     @task = Task.new
#   end

#   # Modifier
#   def create

#     @task = current_user.tasks.new(task_params)
#     @task.distribute_time!(params[:task][:time].to_i, params[:distribution]) if @task.respond_to?(:distribute_time!)

#     if @task.save
#       redirect_to new_task_statistic_path(@task), notice: "Task and subtasks successfully added! 📝"
#     else
#       render :index, status: :unprocessable_entity
#     end
#   end


#   def edit
#     @task = Task.find(params[:id])
#   end

#   def update
#     @task = Task.find(params[:id])
#     @task.update(task_params)
#     redirect_to task_path(@task)
#   end

#   def destroy
#     @task = Task.find(params[:id])

#     if @task.user_id == current_user.id
#       @task.destroy
#       redirect_to tasks_path, notice: "Task successfully deleted! 📋"
#     else
#       redirect_to tasks_path, alert: "You don't have permission to delete this task."
#     end
#   end

#   private

#   # Modifier
#   def task_params
#     params.require(:task).permit(
#       :name,
#       :description,
#       :time,
#       subtasks_attributes: [:name, :description, :time]
#     )
#   end


#   # def set_task
#   #   @task = Task.find(params[:id])
#   # end
# end

# app/controllers/tasks_controller.rb
class TasksController < ApplicationController
  before_action :set_task, only: [:show, :edit, :update, :destroy]

  def index
    @tasks = Task.all
  end

  def show
  end

  def new
    @task = Task.new
    3.times { @task.subtasks.build }
  end

  def create
    @task = current_user.tasks.new(task_params)

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
      @task.destroy
      redirect_to tasks_path, notice: "Task successfully deleted! 📋"
    else
      redirect_to tasks_path, alert: "You don't have permission to delete this task."
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
      subtasks_attributes: [:id, :name, :description, :time, :_destroy]
    )
  end
end
