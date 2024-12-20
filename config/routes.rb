Rails.application.routes.draw do
  scope "(:locale)", locale: /en|ar/ do
    get 'search', to: 'search#index'
    authenticate :user, ->(user){user.admin?} do
      get 'admin',to: "admin#index"
      get 'admin/posts'
      get 'admin/comments'
      get 'admin/users'
      get 'admin/show_post/:id',to: "admin#show_post", as:"admin_post"
    end
    root 'posts#index', as: "root"

    get 'posts/apply',to: "posts#apply"
    resources :posts do
      member do
        get '/posts', to: redirect("posts#index")
        # remove_image_post_path(image)
        delete :remove_image
      end
      resources :comments
    end
    #devise_for :users

    devise_for :users, controllers: { registrations: "user/registrations" }

    devise_scope :user do
      get '/users/sign_out' => 'devise/sessions#destroy'
    end




  end
    # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

    # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
    # Can be used by load balancers and uptime monitors to verify that the app is live.
    get "up" => "rails/health#show", as: :rails_health_check

    # Defines the root path route ("/")
    # root "posts#index"

end
