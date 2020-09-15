class CreateRequestExecutions < ActiveRecord::Migration[6.0]
  def change
    create_table :request_executions do |t|
      t.integer :request_id

      t.timestamps
    end
  end
end
