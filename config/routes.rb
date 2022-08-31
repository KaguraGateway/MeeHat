Rails.application.routes.draw do
  get 'app(/*path1(/*path2(/*path3(/*path4(/*path5(/*path6))))))', to: 'app#index'
  devise_for :users, path: "", path_names: { sign_in: "login", sign_out: "logout", registration: "register" }, controllers: {
    registrations: "users/registrations"
  }

  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
  get 'api/v1/workspaces', to: 'api#get_workspace'
  post 'api/v1/workspaces', to: 'api#create_workspace'
  get 'api/v1/workspaces/:id', to: 'api#get_workspace'
  delete 'api/v1/workspaces/:id', to: 'api#delete_workspace'
  post 'api/v1/workspaces/:id/participation', to: 'api#join_workspace'
  delete 'api/v1/workspaces/:id/participation', to: 'api#leave_workspace'
  get 'api/v1/workspaces/:id/channels', to: 'api#get_channels'
  post 'api/v1/workspaces/:id/channels', to: 'api#create_channel'
  get 'api/v1/workspaces/:id/channels/:id', to: 'api#get_channel'
  #post 'api/v1/workspaces/:id/channels/:id', to: 'api#

  get 'api/v1/channels/:channel_id/messages', to: 'api#get_messages'
  post 'api/v1/channels/:channel_id/messages', to: 'api#create_message'


  # Defines the root path route ("/")
  root "home#index"
end
