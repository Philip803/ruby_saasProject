class Contact < ActiveRecord::Base
  # Contact From validations 
  validates :name , presence: true
  validates :email , presence: true
  validates :comments , presence:true
end
