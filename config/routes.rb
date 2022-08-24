Rails.application.routes.draw do
  devise_for :users, path: "", path_names: { sign_in: "login", sign_out: "logout", sign_up: "register" }

  devise_scope :user do
    patch '/register', to: 'devise/registrations#update'
    put '/register', to: 'devise/registrations#update'
    delete '/register', to: 'devise/registrations#destroy'
    post '/register', to: 'devise/registrations#create'
  end

  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  root "home#index"
end
