class CreateStatistics < ActiveRecord::Migration[7.1]
  def change
    create_table :statistics do |t|
      t.belongs_to :user, null: false, foreign_key: true
      t.datetime :start_time
      t.datetime :end_time
      t.references :input, polymorphic: true, null: false
      t.string :input_status
      t.integer :input_rating
      t.integer :input_performance

      t.timestamps
    end
  end
end
