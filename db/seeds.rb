# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end
# users = [
#   { username: 'Admin', email: 'Admin@administrator.com', password: 'asdf2581',password_confirmation: 'asdf2581' },
# ]
# users.each { |user_data| User.create!(user_data) }

# # Create posts
# posts = [
#   { id: 0,title: 'Not Approved', content: 'Not approved Comments', user_id: User.first.id },
# ]
# posts.each { |post_data| Post.find_or_create_by(post_data) }

# 100.times do |n|
#   Post.create title: "post#{n}", content: "content#{n}", approved: true, user_id: User.first.id
# end

100.times do |n|
  Comment.create content: "post#{n}", post_id: Post.first.id, approved: true, user_id: User.first.id
end
