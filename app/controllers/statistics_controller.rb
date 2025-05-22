class StatisticsController < ApplicationController
  def index
    @statistics = Statistic.all
  end

  # def show
  #   @statistic = Statistic.find(params[:id])
  # end

  def advanced
    @daily_stats = Statistic
      .where(user: current_user)
      .group_by { |s| s.start_time.to_date }

    @chart_data = @daily_stats.map do |date, stats|
      performances = stats.map(&:input_performance).compact
      next if performances.empty?

      {
        date: date.strftime('%Y-%m-%d'),
        avg: (performances.sum.to_f / performances.size).round(2)
      }
    end.compact
  end


  def new
    @statistic = Statistic.new
  end

  def create
    @statistic = Statistic.new(statistic_params)

    if @statistic.save
      redirect_to tasks_path, notice: "Statistic successfully added! 📈"
    else
      render :new, status: :unprocessable_entity
    end
  end

  def edit
    @statistic = Statistic.find(params[:id])
  end

  def update
    @statistic = Statistic.find(params[:id])
    @statistic.update(statistic_params)
    redirect_to tasks_path
  end

  # def destroy
  #   @statistic = Statistic.find(params[:id])

  #   if @statistic.user_id == current_user.id
  #     @statistic.destroy
  #     redirect_to task_statistics_path, notice: "Statistic successfully deleted! 📈"
  #   else
  #     redirect_to task_statistics_path, alert: "You don't have permission to delete this statistic."
  #   end
  # end

  private

  def statistic_params
    params.require(:task).permit(:input_status, :input_rating, :input_performance)
  end
end
