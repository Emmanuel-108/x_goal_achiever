// app/javascript/controllers/task_form_submit_controller.js

import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static values = { timeInputSelector: String }

  connect() {
    this.element.addEventListener('submit', this.handleSubmit.bind(this));
  }

  handleSubmit(e) {

    const timeInput = document.querySelector(this.timeInputSelectorValue);
    if (timeInput) {
      let timeField = this.element.querySelector('input[name="task[time]"]');
      if (!timeField) {
        timeField = document.createElement('input');
        timeField.type = 'hidden';
        timeField.name = 'task[time]';
        this.element.appendChild(timeField);
      }
      let minutes = parseInt(timeInput.value, 10);
      let timeStr = `00:${minutes.toString().padStart(2, '0')}:00`;
      timeField.value = timeStr;
      // DEBUG
      console.log("🔵 minutes saisies:", minutes, "champ caché task[time]:", timeField.value);
    } else {
      console.warn("⛔ Impossible de trouver le champ temps !");
    }


    let checkedDist = document.querySelector('input[name="distribution"]:checked');
    if (checkedDist) {
      let distField = this.element.querySelector('input[name="distribution"]');
      if (!distField || distField.type !== 'hidden') {
        distField = document.createElement('input');
        distField.type = 'hidden';
        distField.name = 'distribution';
        this.element.appendChild(distField);
      }
      distField.value = checkedDist.value;
    }
  }
}
