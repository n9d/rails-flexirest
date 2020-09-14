class RequestController < ApplicationController

  # def create
  #   @req = Request.new(req_params)
  #   pp @req
  #   if @req.save
  #     render json: {status: "OK", data: @req} 
  #   else
  #     render json: {status: "error", data: @req.errors}
  #   end
  # end

  def show
    render json: Request.find(params[:id])
  end

  def index
    render json: Request.all
  end

end

# private

#   def req_params
#     a=params.permit(:art_id,:before,:after)
#   end

# end
