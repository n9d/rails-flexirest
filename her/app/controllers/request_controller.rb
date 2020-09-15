class RequestController < ApplicationController

  def show
    render json: Request.find(params[:id])
  end

  def index
    render json: Request.all
  end

end
