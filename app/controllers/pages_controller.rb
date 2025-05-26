class PagesController < ApplicationController
  skip_before_action :authenticate_user!, only: [ :home, :tutorial ]

  def home
  end

  def tutorial
  end

  # def contact
  # end

  def notification
  end
end
