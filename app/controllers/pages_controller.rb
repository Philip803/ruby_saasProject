class PagesController < ApplicationController
  # Get request for / which is our home page
  def home
    @basic_plan = Plan.find(1).id
    @pro_plan = Plan.find(2).id
  end

  def about
  end
end
