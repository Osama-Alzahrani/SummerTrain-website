class CommentsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_post


  def create
    @comment = @post.comments.create(comment_params)
    @comment.user = current_user

    if @comment.save
      flash[:notice] = "Your comment has been posted!"
      redirect_to post_path(@post)
    else
      flash[:notice] = "Your comment has not created!"
      redirect_to post_path(@post)
    end
  end

  def destroy
    @comment = Comment.find(params[:id])
    @comment.destroy
    redirect_to post_path(@post)
  end

  private

  def set_post
    @post = Post.find(params[:post_id])
  end

  def comment_params
    params.require(:comment).permit(:content)
  end
end
