class ArtsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def create
    @art = Article.new(art_params)
    pp @art
    if @art.save
      render json: {status: "OK", data: @art} 
    else
      render json: {status: "error", data: @art.errors}
    end
  end

  def show
    render json: Article.find(params[:id])
  end

  def index
    render json: Article.all
  end

  def update
    params.permit(:id,:title,:text,:created_at,:updated_at)

    pp params
    @art = Article.find(params[:id])
    @art.update(text: params[:text])
    @art.update(title: params[:title])
    if @art.save 
      render json: {status: "OK", data: @art} 
    else
      render json: {status: "error", data: @art.errors}
    end
  end
end

private

def art_params
  a=params.permit(:title, :text)
end

