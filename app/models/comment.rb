class Comment < ApplicationRecord
  has_rich_text :content
  belongs_to :post, counter_cache: true
  belongs_to :user, optional: true

  has_many_attached :images
  # validates :images, presence: true
end
