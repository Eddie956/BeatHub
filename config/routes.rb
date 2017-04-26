Rails.application.routes.draw do
  root to: 'static_pages#root'

  namespace :api, default: {format: :json} do
    resources :users, has_many: :comments, only: [:create] do
      resources :playlists, only: [:create, :index]
    end
    resource :session, only: [:create, :destroy]
    resources :albums, only: [:show, :index] do
      resources :songs, only: [:index]
    end
    resources :songs, only: [:show]
    resources :artists, has_many: :comments, only: [:show] do
      resources :albums, only: [:index]
    end
    get '/search' => 'searches#search', as: 'search'
    resources :playlists, has_many: :comments, only: [:show, :update, :destroy]
    resources :playlist_songs, only: [:create, :destroy]
  end
end
