class CommentsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_post


  def create
    @comment = @post.comments.create(comment_params)
    @comment.user = current_user
    if @comment.images.length > 2 # 2 images only
      redirect_to request.referrer, alert: "Bad images!"
    else

      if @comment.save
        flash[:notice] = "Your comment has been posted!"
        redirect_to post_path(@post)
      else
        flash[:notice] = "Your comment has not created!"
        redirect_to post_path(@post)
      end
    end
  end

  def destroy
    @comment = Comment.find(params[:id])
    @comment.destroy
    redirect_to post_path(@post)
  end

  def update
    @comment = @post.comments.find(params[:id])

    respond_to do |format|
      if (params["comment"]["images"].length-1) > 2 # 2 files only
        format.html { redirect_to request.referrer, alert: "you can only upload 2 Files!" }
      else

      if @comment.update(comment_params)
        if(current_user.admin?)
          format.html { redirect_to request.referrer, notice: 'Comment has been updated' }
        else
          format.html { redirect_to post_url(@post), notice: 'Comment has been updated' }
        end

      else
        format.html { redirect_to post_url(@post), alert: 'Comment was not updated!' }
      end
    end
    end
  end

  def remove_image
    @image = ActiveStorage::Attachment.find(params[:id])
    @image.purge_later
    redirect_back(fallback_location: request.referer)
  end


  private

  def set_post
    @post = Post.find(params[:post_id])
  end

  def comment_params
    params.require(:comment).permit(:post_id,:content, :inst, :duration, :job_offered, :salary, :recommend,:note,:approved, images: [])
  end
end
