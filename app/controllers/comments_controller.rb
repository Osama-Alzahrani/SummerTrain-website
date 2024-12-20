class CommentsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_post

  def new
    @post = Post.find(0) # Replace 0 with the actual ID
    @comment = @post.comments.create
  end

  def create
    @comment = @post.comments.build(comment_params)
    @comment.user = current_user
    if @comment.images.length > 2 # 2 images only
      redirect_to request.referrer, alert: t("comment.messages.errors.too_many_images")
    else

      if @comment.save
        flash[:notice] = t("comment.messages.notification.complete_message")
        redirect_to post_path(@post)
      else
        # flash[:alert] = "Your comment has not created!"
        # redirect_to posts_apply_path, notice: "Your comment has not created!"

        render :new, status: :unprocessable_entity
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
        format.html { redirect_to request.referrer, alert: t("comment.messages.errors.too_many_images") }
      else

      if @comment.update(comment_params)
        if(current_user.admin?)
          format.html { redirect_to request.referrer, notice: t("comment.messages.notification.update") }
        else
          format.html { redirect_to post_url(@post), notice: t("comment.messages.notification.update") }
        end

      else
        format.html { redirect_to post_url(@post), alert: t("comment.messages.errors.update") }
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
