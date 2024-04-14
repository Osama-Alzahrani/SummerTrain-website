class Post < ApplicationRecord
  has_rich_text :content

  has_many_attached :images
  belongs_to :user, optional: true
  has_many :comments, dependent: :destroy

end
