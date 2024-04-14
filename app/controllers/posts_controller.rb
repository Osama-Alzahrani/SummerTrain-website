class PostsController < ApplicationController
  before_action :set_post, only: %i[ show edit update destroy ]
  before_action :authenticate_user!, except: %i[ show index]
  before_action :is_author?, only: [:edit, :update, :destroy]
  # GET /posts or /posts.json
  def index
    @posts = Post.includes(:user, :images_attachments, :rich_text_content).all

    @pagy,  @posts = pagy(@posts)
  end

  def apply

  end

  def is_author?
      redirect_to root_path,notice: "You are not authorized to edit this post." unless @post.user == current_user or current_user.admin?
  end

  # GET /posts/1 or /posts/1.json
  def show
    @comments = @post.comments.includes(:user, :images_attachments, :rich_text_content).order(created_at: :desc)
    @pagy,  @comments = pagy(@comments)
  end

  # GET /posts/new
  def new
    @post = Post.new
  end

  # GET /posts/1/edit
  def edit
  end

  # POST /posts or /posts.json
  def create
    @post = Post.new(post_params)
    @post.approved = false
    @post.user = current_user

    respond_to do |format|
      if @post.save
        format.html { redirect_to post_url(@post), notice: "Post was successfully created." }
        format.json { render :show, status: :created, location: @post }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @post.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /posts/1 or /posts/1.json
  def update
    if current_user == @post.user or current_user.admin?

      respond_to do |format|
        if @post.update(post_params)
          if current_user.admin?
            format.html { redirect_to request.referrer, notice: "Post was successfully updated."}
          else
            format.html { redirect_to post_url(@post), notice: "Post was successfully updated." }
          end

          format.json { render :show, status: :ok, location: @post }
        else
          format.html { render :edit, status: :unprocessable_entity }
          format.json { render json: @post.errors, status: :unprocessable_entity }
        end
      end
    else
      redirect_to root_url, notice: "You are not authorized to edit this post."
    end
  end

  # DELETE /posts/1 or /posts/1.json
  def destroy
    if current_user == @post.user
      @post.destroy!

      respond_to do |format|
        format.html { redirect_to posts_url, notice: "Post was successfully destroyed." }
        format.json { head :no_content }
      end
    end
  end

  def remove_image
    @image = ActiveStorage::Attachment.find(params[:id])
    @image.purge_later
    redirect_back(fallback_location: request.referer)
  end



  private

    # Use callbacks to share common setup or constraints between actions.
    def set_post
      @post = Post.find(params[:id])
      # redirect_to root_path,notice: "You are not authorized to edit this post." unless @post.user == current_user or current_user.admin?
    end

    rescue_from ActiveRecord::RecordNotFound do # Redirect to root_url if record not found !!
      redirect_to root_url
    end

    # Only allow a list of trusted parameters through.
    def post_params
      params.require(:post).permit(:title, :content,:approved,images: [])
    end
end
