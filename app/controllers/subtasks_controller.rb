class SubtasksController < ApplicationController
  def index
    @subtasks = Subtask.all
  end

  def show
    @subtask = Subtask.find(params[:id])
  end

  def new
    @subtask = Subtask.new
  end

  def create
    @subtask = Subtask.new(subtask_params)

    if @subtask.save
      redirect_to subtask_path(@subtask), notice: "Subtask successfully added! 📝"
    else
      render :new, status: :unprocessable_entity
    end
  end

  def edit
    @subtask = Subtask.find(params[:id])
  end

  def update
    @subtask = Subtask.find(params[:id])
    @subtask.update(subtask_params)
    redirect_to subtask_path(@subtask)
  end

  def destroy
    @subtask = Subtask.find(params[:id])

    if @subtask.task.user_id == current_user.id
      @subtask.destroy
      redirect_to subtasks_path, notice: "Subtask successfully deleted! 📋"
    else
      redirect_to subtasks_path, alert: "You don't have permission to delete this subtask."
    end
  end

  private

  def subtask_params
    params.require(:task).permit(:name, :description, :time)
  end
end
