class RequestExecutionsController < ApplicationController
  def new
    @request_execution = RequestExecution.new
  end

  def create
    @request_execution = RequestExecution.create params.require(:request_execution).permit(:request_id, :image) # POINT
    redirect_to @request_execution
  end

  def show
    @request_execution = RequestExecution.find(params[:id])
  end
end
