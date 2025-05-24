import { application } from "controllers/application"
import { eagerLoadControllersFrom } from "@hotwired/stimulus-loading"

import TaskFormSubmitController from "./task_form_submit_controller"
application.register("task-form-submit", TaskFormSubmitController)


eagerLoadControllersFrom("controllers", application)
