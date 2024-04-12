class AddApprovedToComments < ActiveRecord::Migration[7.1]
  def change
    add_column :comments, :approved, :boolean, default: false
  end
end
