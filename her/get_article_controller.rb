class GetArticleController < ApplicationController
  def show
    render json: Art.find(params[:id])
  end
end

