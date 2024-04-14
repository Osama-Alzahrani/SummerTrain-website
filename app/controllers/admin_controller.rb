class AdminController < ApplicationController
  def index; end

  def posts
    @posts = Post.all.includes(:user)
  end

  def comments
  end

  def users
  end

  def show_post
    @post = Post.includes(:user, comments: [:user, :images_attachments,:rich_text_content]).find(params[:id])
  end
end
