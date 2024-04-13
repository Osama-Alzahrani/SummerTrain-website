class Comment < ApplicationRecord
  belongs_to :post, counter_cache: true
  belongs_to :user, optional: true

  has_many_attached :images
  validates :images, presence: true
end
