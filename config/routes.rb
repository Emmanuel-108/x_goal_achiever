Rails.application.routes.draw do
  devise_for :users
  root to: "pages#home"

  # Root for focus until the create new task was create
  get 'focus', to: 'pages#focus', as: :focus


  get 'tutorial', to: "pages#tutorial"
  # get 'contact', to: 'pages#contact'
  get 'notifications', to: 'pages#notification'
  resources :profiles, only: [:show, :edit, :update]

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # root "tasks#index"

  resources :tasks do
    resources :subtasks
    resources :statistics, only: [:index, :new, :create, :edit, :update ]
  end

  resources :subtasks do
    resources :statistics, only: [:index, :new, :create, :edit, :update ]
  end
  # /statistics
  get 'statistics/advanced', to: 'statistics#advanced', as: :advanced_statistics

  resources :contacts, only: [:index, :new, :create]
end
