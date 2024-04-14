class ApplicationController < ActionController::Base
  around_action :switch_locale

  include Pagy::Backend

  def switch_locale(&action)
    locale = params[:locale] || I18n.default_locale
    I18n.with_locale(locale, &action)
  end
end
