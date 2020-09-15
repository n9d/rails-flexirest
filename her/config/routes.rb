Rails.application.routes.draw do

  resources :request_executions
  get 'article_form/index'
  get 'article/index'
  get 'request_execution/index'
  get 'request/index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  get 'article/:id' , to: 'article#show'
  put 'article/:id' , to: 'article#update'
  patch 'article/:id' , to: 'article#update'

  resources :request_exec

end
