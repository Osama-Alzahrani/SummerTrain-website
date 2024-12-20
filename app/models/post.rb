class Post < ApplicationRecord
  has_rich_text :content

  has_many_attached :images
  belongs_to :user, optional: true
  has_many :comments, dependent: :destroy

  def self.ransackable_attributes(auth_object = nil)
    ["content", "title"]
  end
  def self.ransackable_associations(auth_object = nil)
    ["comments", "images_attachments", "images_blobs", "rich_text_content", "user"]
  end

end
