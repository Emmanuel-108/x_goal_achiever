class StatisticsController < ApplicationController
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

    @statistics = Statistic.where(user: current_user)
                          .where('start_time >= ?', 7.days.ago)
                          .order(:start_time)


    @chart_data = @statistics
      .group_by { |s| s.start_time.strftime("%Y-%m-%d %H") }
      .map do |key, stats|
        performances = stats.map(&:input_performance).compact
        {
          date: Time.parse("#{key}:00").strftime("%Y-%m-%d %H:%M"),
          avg: (performances.sum.to_f / performances.size).round(2),
          min: performances.min,
          max: performances.max
        }
      end

  end


  # def show
  #   @statistic = Statistic.find(params[:id])
  # end

  #
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
    params.require(:task).permit(:start_time, :end_time, :input_type, :input_status, :input_rating, :input_performance)
  end
end
