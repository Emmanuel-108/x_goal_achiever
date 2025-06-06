class StatisticsController < ApplicationController
  helper :statistics # Permet d’utiliser focus_minutes dans la vue

  def index
    @statistics = Statistic.where(user: current_user)

    if params[:status].present?
      @statistics = @statistics.where(input_status: params[:status])
    end

    if params[:date].present?
      date = Date.parse(params[:date])
      @statistics = @statistics.where(start_time: date.beginning_of_day..date.end_of_day)
    else
      @statistics = @statistics.where('start_time >= ?', 7.days.ago)
    end

    @statistics = @statistics.order(:start_time)

    @chart_data = @statistics
      .group_by { |s| s.start_time.strftime("%Y-%m-%d %H") }
      .map do |key, stats|
        performances = stats.map(&:input_performance).compact
        {
          date: Time.parse("#{key}:00").strftime("%Y-%m-%d %H:%M"),
          avg: (performances.sum.to_f / performances.size).round(2),
          min: performances.min,
          max: performances.max,
          subtasks: stats.select { |s| s.input_type == "Subtask" && s.input.present? }
            .map do |stat|
              {
                name: stat.input.name,
                time: stat.input.time
              }
            end
        }
      end
  end

  def new
    @statistic = Statistic.new

    # Pour focus panel : toujours charger la bonne task via params[:task_id]
    if params[:task_id].present?
      @task = Task.find_by(id: params[:task_id])
    else
      @task = current_user.tasks.order(created_at: :desc).first
    end

    unless @task
      redirect_to tasks_path, alert: "The task was not found."
      return
    end
  end

  def create
    # Trouver la bonne tâche à associer (en cas de submit focus panel)
    if params[:input_id].present?
      @task = Task.find_by(id: params[:input_id])
    else
      @task = current_user.tasks.order(created_at: :desc).first
    end

    unless @task
      redirect_to tasks_path, alert: "The task was not found."
      return
    end

    # Crée la statistique principale pour la tâche
    @statistic = @task.statistics.new(
      user: current_user,
      input_type: params[:input_type],
      start_time: params[:start_time],
      end_time: params[:end_time],
      input_status: params[:input_status],
      input_rating: params[:input_rating],
      input_performance: params[:input_performance]
    )

    if @statistic.save
      # Create statistics for each subtask (if provided)
      if params[:subtask_stats].present?
        params[:subtask_stats].each do |subtask_stat|
          # Skip if required fields are missing
          next if subtask_stat[:input_id].blank? || subtask_stat[:start_time].blank? || subtask_stat[:end_time].blank?

          Statistic.create(
            user: current_user,
            input_type: 'Subtask',
            input_id: subtask_stat[:input_id],
            start_time: subtask_stat[:start_time],
            end_time: subtask_stat[:end_time]
          )
        end
      end

      redirect_to tasks_path, notice: "Registered focus session!"
    else
      render :new, status: :unprocessable_entity
    end
  end

  # def edit
  #   @statistic = Statistic.find(params[:id])
  # end

  # def update
  #   @statistic = Statistic.find(params[:id])
  #   @statistic.update(statistic_params)
  #   redirect_to tasks_path
  # end

  private

  def statistic_params
    params.require(:statistic).permit(:start_time, :end_time, :input_type, :input_status, :input_rating, :input_performance)
  end
end
