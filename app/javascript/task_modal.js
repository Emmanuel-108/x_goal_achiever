// task_modal.js

// document.addEventListener("DOMContentLoaded", () => {
//   let currentStep = 1;
//   const totalSteps = 5;

//   const steps = document.querySelectorAll('.step');
//   const nextBtn = document.getElementById('nextStep');
//   const prevBtn = document.getElementById('prevStep');

//   function showStep(step) {
//     steps.forEach((el, index) => {
//       el.classList.toggle('d-none', index !== step - 1);
//     });

//     prevBtn.disabled = step === 1;
//     nextBtn.style.display = step === totalSteps ? 'none' : 'inline-block';
//   }

//   const subtaskCountSelect = document.getElementById('subtaskCountSelect');
//   const subtaskInputsContainer = document.getElementById('subtaskInputs');

//   function generateSubtaskInputs(count) {
//     subtaskInputsContainer.innerHTML = ''; // Clear previous inputs

//     for (let i = 1; i <= count; i++) {
//       const input = document.createElement('input');
//       input.type = 'text';
//       input.name = `task[subtasks_attributes][${i}][name]`;
//       input.placeholder = `Sub-task ${i}`;
//       input.className = 'form-control mb-2';
//       subtaskInputsContainer.appendChild(input);
//     }
//   }

//   const hiddenSubtaskCount = document.getElementById('hiddenSubtaskCount');
//   subtaskCountSelect.addEventListener('change', () => {
//     hiddenSubtaskCount.value = subtaskCountSelect.value;
//   });

//   nextBtn.addEventListener('click', () => {
//     if (currentStep < totalSteps) {
//       currentStep++;

//       // Generate sub-task inputs when entering Slide 3
//       if (currentStep === 3) {
//         const count = parseInt(subtaskCountSelect.value);
//         generateSubtaskInputs(count);
//       }

//         // Slide 5 logic: Prepare combined datetime
//         if (currentStep === 5) {
//           const date = document.getElementById('date').value;
//           const time = document.getElementById('time_input').value;

//           if (date && time) {
//             const datetime = new Date(`${date}T${time}`);
//             document.getElementById('combinedDatetime').value = datetime.toISOString();
//           }
//         }

//       showStep(currentStep);
//     }
//   });

//   prevBtn.addEventListener('click', () => {
//     if (currentStep > 1) {
//       currentStep--;
//       showStep(currentStep);
//     }
//   });

//   const modalElement = document.getElementById('exampleModalCenter');
//   modalElement.addEventListener('show.bs.modal', () => {
//     currentStep = 1;
//     showStep(currentStep);
//   });
// });
