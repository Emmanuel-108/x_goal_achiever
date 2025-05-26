ActiveRecord::Schema[7.1].define(version: 2025_05_24_180214) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "contacts", force: :cascade do |t|
    t.string "full_name"
    t.string "email"
    t.string "phone_number"
    t.text "message"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "statistics", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.datetime "start_time"
    t.datetime "end_time"
    t.string "input_type", null: false
    t.bigint "input_id", null: false
    t.string "input_status"
    t.integer "input_rating"
    t.integer "input_performance"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["input_type", "input_id"], name: "index_statistics_on_input"
    t.index ["user_id"], name: "index_statistics_on_user_id"
  end

  create_table "subtasks", force: :cascade do |t|
    t.string "name"
    t.text "description"
    t.integer "time"
    t.bigint "task_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["task_id"], name: "index_subtasks_on_task_id"
  end

  create_table "tasks", force: :cascade do |t|
    t.string "name"
    t.text "description"
    t.integer "time"
    t.bigint "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_tasks_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "first_name"
    t.string "last_name"
    t.date "date_of_birth"
    t.string "gender"
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  add_foreign_key "statistics", "users"
  add_foreign_key "subtasks", "tasks"
  add_foreign_key "tasks", "users"
end
