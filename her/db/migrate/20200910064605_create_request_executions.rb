class CreateRequestExecutions < ActiveRecord::Migration[6.0]
  def change
    create_table :request_executions do |t|
      t.text :content

      t.timestamps
    end
  end
end
