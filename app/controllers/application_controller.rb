class ApplicationController < ActionController::Base
  around_action :switch_locale
  before_action :set_query

  include Pagy::Backend

  def set_query
    @query = Post.ransack(params[:q])
  end

  def switch_locale(&action)
    locale = params[:locale] || I18n.default_locale
    I18n.with_locale(locale, &action)
  end
end
