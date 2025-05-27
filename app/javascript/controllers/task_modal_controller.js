import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="task-modal"
export default class extends Controller {
  static targets = [
    "step", "nextBtn", "prevBtn", "subtaskCountSelect", "subtaskInputs", "hiddenSubtaskCount", "timeDistribution"
  ];

  connect() {
    this.currentStep = 1;
    this.totalSteps = 4;
    this.showStep(this.currentStep);

    const modalElement = document.getElementById('exampleModalCenter');
    if (modalElement) {
      modalElement.addEventListener('show.bs.modal', () => {
        this.currentStep = 1;
        this.showStep(this.currentStep);

        this.populateFields();

        // Reset the form fields
        const form = this.element.querySelector('form');
        if (form) {
          form.reset();

          // Clear dynamically generated subtask inputs container (if any)
          if (this.hasSubtaskInputsTarget) {
            this.subtaskInputsTarget.innerHTML = '';
          }

          // Reset hidden field and subtask count to default value 1
          if (this.hasSubtaskCountSelectTarget) {
            this.subtaskCountSelectTarget.value = "1";
          }
          if (this.hasHiddenSubtaskCountTarget) {
            this.hiddenSubtaskCountTarget.value = "1";
          }

          // Reset Time Distribution
          const distributionRadios = form.querySelectorAll('input[name="task[distribution]"]');
          distributionRadios.forEach(radio => {
            radio.checked = radio.value === "even";
          });

          // Clear task description
          const description = form.querySelector('textarea[name="task[description]"]');
          if (description) description.value = "";

          // Populate hidden name/time from quick form
          const name = document.querySelector("#task_name")?.value;
          const time = document.querySelector("#quick-task-time")?.value;
          const modalName = document.querySelector("#modal_task_name");
          const modalTime = document.querySelector("#modal_task_time");
          if (modalName && name) modalName.value = name;
          if (modalTime && time) modalTime.value = time;
        }
      });
    }
  }

  showStep(step) {
    this.stepTargets.forEach((el, index) => {
      el.classList.toggle('d-none', index !== step - 1);
    });

    this.prevBtnTarget.disabled = step === 1;
    this.nextBtnTarget.style.display = step === this.totalSteps ? 'none' : 'inline-block';
  }

  next() {
    if (this.currentStep < this.totalSteps) {
      this.currentStep++;

      if (this.currentStep === 2) {
        const count = parseInt(this.subtaskCountSelectTarget.value);
        this.generateSubtaskInputs(count);
      }

      if (this.currentStep === 3) {
        const totalTime = parseInt(document.getElementById("modal_task_time")?.value);
        const distribution = document.querySelector("input[name='task[distribution]']:checked")?.value || "even";
        this.assignTimeDistribution(totalTime, distribution);
      }

      this.showStep(this.currentStep);
    }
  }

  prev() {
    if (this.currentStep > 1) {
      this.currentStep--;
      this.showStep(this.currentStep);
    }
  }

  updateSubtaskCount() {
    this.hiddenSubtaskCountTarget.value = this.subtaskCountSelectTarget.value;
    if (this.currentStep >= 3) {
      this.generateSubtaskInputs(parseInt(this.subtaskCountSelectTarget.value));
    }
  }

  generateSubtaskInputs(count) {
    this.subtaskInputsTarget.innerHTML = '';

    for (let i = 1; i <= count; i++) {
      const input = document.createElement('input');
      input.type = 'text';
      input.name = `task[subtasks_attributes][${i}][name]`;
      input.placeholder = `Sub-task ${i}`;
      input.className = 'form-control mb-2';
      input.required = true;
      this.subtaskInputsTarget.appendChild(input);
    }
  }

  populateFields() {
    // if (event) event.preventDefault();

    const nameInput = document.querySelector("#task_name")
    const timeInput = document.querySelector("#quick-task-time")
    const modalName = document.querySelector("#modal_task_name")
    const modalTime = document.querySelector("#modal_task_time")

    // console.log("Populating fields...");

    if (nameInput && timeInput && modalName && modalTime) {
      modalName.value = nameInput.value
      modalTime.value = timeInput.value
      // console.log("Name set to:", modalName.value)
      // console.log("Time set to:", modalTime.value)
    } else {
      // console.warn("One or more elements not found.")
    }
  }

  assignTimeDistribution(totalTime, distributionType) {
    const count = this.subtaskInputsTarget.querySelectorAll("input").length;
    if (count === 0 || !totalTime || isNaN(totalTime)) return;

    let times = [];

    switch (distributionType) {
      case "even":
        times = Array(count).fill(Math.floor(totalTime / count));
        break;
      case "incremental":
        let baseInc = totalTime / (count * (count + 1) / 2);
        times = Array.from({ length: count }, (_, i) => Math.round(baseInc * (i + 1)));
        break;
      case "decremental":
        let baseDec = totalTime / (count * (count + 1) / 2);
        times = Array.from({ length: count }, (_, i) => Math.round(baseDec * (count - i)));
        break;
      case "random":
        let randoms = Array.from({ length: count }, () => Math.random());
        let sum = randoms.reduce((a, b) => a + b, 0);
        times = randoms.map(r => Math.round((r / sum) * totalTime));
        break;
      default:
        times = Array(count).fill(0);
    }

    const timeInputs = this.subtaskInputsTarget.querySelectorAll("input");

    timeInputs.forEach((input, index) => {
      const hidden = document.createElement("input");
      hidden.type = "hidden";
      hidden.name = `task[subtasks_attributes][${index + 1}][time]`;
      hidden.value = times[index];
      this.subtaskInputsTarget.appendChild(hidden);
    });
  }
}
