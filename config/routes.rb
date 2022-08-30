Rails.application.routes.draw do
  get 'app(/*path1(/*path2(/*path3(/*path4(/*path5(/*path6))))))', to: 'app#index'
  devise_for :users, path: "", path_names: { sign_in: "login", sign_out: "logout", registration: "register" }, controllers: {
    registrations: "users/registrations"
  }

  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  root "home#index"
end
