class RequestExecController < ApplicationController
  protect_from_forgery :except => [:request_id,:image]

  def new
    @request_execution = RequestExecution.new
  end

  def create
    @request_execution = RequestExecution.create params.require(:request_execution).permit(:request_id, :image) # POINT
    redirect_to @request_execution
  end

  def show
    a = RequestExecution.find(params[:id])
    b = JSON.parse(a.to_json)
    b[:image_url] = url_for(a.image)
    render json: b
  end
end
