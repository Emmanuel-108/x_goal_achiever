# app/controllers/subtasks_controller.rb

class SubtasksController < ApplicationController
  before_action :set_subtask, only: [:show, :edit, :update, :destroy]

  def index
    @subtasks = Subtask.all
  end

  def show
    # @subtask = Subtask.find(params[:id])
  end

  def new
    @subtask = Subtask.new
  end

  def create
    @subtask = Subtask.new(subtask_params)
    if @subtask.save
      redirect_to @subtask, notice: "Subtask successfully added! 📝"
    else
      render :new, status: :unprocessable_entity
    end
  end

  def edit
    # @subtask = Subtask.find(params[:id])
  end

  def update
    if @subtask.update(subtask_params)
      redirect_to @subtask
    else
      render :edit, status: :unprocessable_entity
    end
  end

  def destroy
    # @subtask = Subtask.find(params[:id])

    if @subtask.task.user_id == current_user.id
      @subtask.destroy
      redirect_to subtasks_path, notice: "Subtask successfully deleted! 📋"
    else
      redirect_to subtasks_path, alert: "You don't have permission to delete this subtask."
    end
  end

  private

  def set_subtask
    @subtask = Subtask.find(params[:id])
  end

  def subtask_params
    params.require(:subtask).permit(:name, :description, :time, :task_id)
  end
end
