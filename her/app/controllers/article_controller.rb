class ArticleController < ApplicationController
  protect_from_forgery :except => [:id,:title,:text,:before]

  def show
    params.permit(:id,:title,:text)
    render json: Art.find(params[:id]).to_h # NOTE: ActiveModel#to_jsonがnullを返すので暫定対処
  end
  def update
    params.permit(:title,:text)

    before = Art.find(params[:id])
    @art = Art.find(params[:id])
    @art.title = params[:title]
    @art.text = params[:text]

    @art.save

    @req = Request.new()
    @req.form_id = 1
    @req.user_id = 1
    @req.before = params[:before]
    @req.after = @art.to_json
    @req.save

      # a=params.permit(:art_id,:before,:after)
 
    render json: @art.to_h

    # if @art.save 
    #   render json: {status: "OK", data: @art} 
    # else
    #   render json: {status: "error", data: @art.errors}
    # end

  end

end
