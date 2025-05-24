// import { Controller } from "@hotwired/stimulus"

// // Connects to data-controller="task-modal"
// export default class extends Controller {
//   static targets = [
//     "step", "nextBtn", "prevBtn", "subtaskCountSelect", "subtaskInputs", "hiddenSubtaskCount"
//   ];

//   connect() {
//     this.currentStep = 1;
//     this.totalSteps = 4;
//     this.showStep(this.currentStep);

//     const modalElement = document.getElementById('exampleModalCenter');
//     if (modalElement) {
//       modalElement.addEventListener('show.bs.modal', () => {
//         this.currentStep = 1;
//         this.showStep(this.currentStep);

//         // Reset the form fields
//         const form = this.element.querySelector('form');
//         if (form) {
//           form.reset();

//           // Clear dynamically generated subtask inputs container (if any)
//           if (this.hasSubtaskInputsTarget) {
//             this.subtaskInputsTarget.innerHTML = '';
//           }

//           // Reset hidden field to default value if needed
//           if (this.hasHiddenSubtaskCountTarget) {
//             this.hiddenSubtaskCountTarget.value = this.subtaskCountSelectTarget.value;
//           }
//         }
//       });
//     }
//   }

//   showStep(step) {
//     this.stepTargets.forEach((el, index) => {
//       el.classList.toggle('d-none', index !== step - 1);
//     });

//     this.prevBtnTarget.disabled = step === 1;
//     this.nextBtnTarget.style.display = step === this.totalSteps ? 'none' : 'inline-block';
//   }

//   next() {
//     if (this.currentStep < this.totalSteps) {
//       this.currentStep++;

//       if (this.currentStep === 3) {
//         const count = parseInt(this.subtaskCountSelectTarget.value);
//         this.generateSubtaskInputs(count);
//       }

//       this.showStep(this.currentStep);
//     }
//   }

//   prev() {
//     if (this.currentStep > 1) {
//       this.currentStep--;
//       this.showStep(this.currentStep);
//     }
//   }

//   updateSubtaskCount() {
//     this.hiddenSubtaskCountTarget.value = this.subtaskCountSelectTarget.value;
//     if (this.currentStep >= 3) {
//       this.generateSubtaskInputs(parseInt(this.subtaskCountSelectTarget.value));
//     }
//   }

//   generateSubtaskInputs(count) {
//     this.subtaskInputsTarget.innerHTML = '';
//     // modifer
//     for (let i = 0; i < count; i++) {
//       const input = document.createElement('input');
//       input.type = 'text';
//       input.name = `task[subtasks_attributes][${i}][name]`; // commence à 0 !
//       input.placeholder = `Sous-tâche ${i + 1}`;
//       input.className = 'form-control mb-2';
//       input.required = true;
//       this.subtaskInputsTarget.appendChild(input);
//     }

// }

import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = [
    "step", "nextBtn", "prevBtn", "subtaskCountSelect", "subtaskInputs", "hiddenSubtaskCount"
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


        const form = this.element;
        if (form) {
          form.reset();

          if (this.hasSubtaskInputsTarget) {
            this.subtaskInputsTarget.innerHTML = '';
          }
          if (this.hasHiddenSubtaskCountTarget && this.hasSubtaskCountSelectTarget) {
            this.hiddenSubtaskCountTarget.value = this.subtaskCountSelectTarget.value;
          }
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
    if (this.currentStep === 1) {
      const taskNameInput = this.element.querySelector('input[name="task[name]"]');
      if (!taskNameInput.value.trim()) {
        taskNameInput.classList.add('is-invalid');
        taskNameInput.focus();
        return;
      } else {
        taskNameInput.classList.remove('is-invalid');
      }
    }

    if (this.currentStep < this.totalSteps) {
      this.currentStep++;

      if (this.currentStep === 3) {
        const count = parseInt(this.subtaskCountSelectTarget.value, 10);
        this.generateSubtaskInputs(count);
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
      this.generateSubtaskInputs(parseInt(this.subtaskCountSelectTarget.value, 10));
    }
  }

  generateSubtaskInputs(count) {
    this.subtaskInputsTarget.innerHTML = '';
    for (let i = 0; i < count; i++) {
      const input = document.createElement('input');
      input.type = 'text';
      input.name = `task[subtasks_attributes][${i}][name]`;
      input.placeholder = `Sous-tâche ${i + 1}`;
      input.className = 'form-control mb-2';
      input.required = true;
      this.subtaskInputsTarget.appendChild(input);
    }
  }
}
