Rails.application.routes.draw do
  root to:'pages#home'
  devise_for :users, controllers: {registrations: 'users/registrations'}
  get 'about' , to: 'pages#about'
  resources :contacts , only: :create #for create object in rails, auto create parts
  get 'contact-us' , to: 'contacts#new' , as: 'new_contact'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
 
