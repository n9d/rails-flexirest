class RequestExecutionsController < ApplicationController
  def new
    @request_exceution = RequestExecution.new
  end

  def create
    pp "*******************************"
    pp params
    @request_execution = RequestExecution.create params.permit(:content, :image) # POINT
    redirect_to @request_execution
  end

  def show
    @request_execution = RequestExecution.find(params[:id])
  end
end
