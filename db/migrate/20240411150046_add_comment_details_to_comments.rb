class AddCommentDetailsToComments < ActiveRecord::Migration[7.1]
  def change
    add_column :comments, :inst, :string
    add_column :comments, :duration, :string
    add_column :comments, :job_offered, :boolean
    add_column :comments, :salary, :string
    add_column :comments, :recommend, :text
    add_column :comments, :note, :text
  end
end
