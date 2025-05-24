// Task Time and Subtasks Time Distribution Sync

document.addEventListener("DOMContentLoaded", function () {
  const triggerButton = document.querySelector("[data-bs-target='#exampleModalCenter']");
  const timeInput = document.getElementById("time");
  const distributionInputs = document.querySelectorAll("input[name='distribution']");

  triggerButton.addEventListener("click", function () {
    const selectedDistribution = Array.from(distributionInputs).find(radio => radio.checked)?.value;

    // Populate hidden fields inside the modal form
    document.getElementById("hidden_time").value = timeInput.value;
    document.getElementById("hidden_distribution").value = selectedDistribution;
    console.log("Time:", timeInput.value);
    console.log("Distribution:", selectedDistribution);
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const createTaskButton = document.querySelector("form button[type='submit']");

  if (createTaskButton) {
    createTaskButton.addEventListener("click", () => {
      const selectedTime = document.getElementById("task_time_input")?.value;
      const selectedDistribution = document.querySelector("input[name='task[distribution]']:checked")?.value;

      document.getElementById("hidden_time").value = selectedTime;
      document.getElementById("hidden_distribution").value = selectedDistribution;
    });
  }
});

// Task Time and Subtasks Time Distribution Sync

// document.addEventListener("DOMContentLoaded", function () {
//   const openModalButton = document.querySelector("[data-bs-target='#exampleModalCenter']");
//   const modalSubmitButton = document.querySelector("#exampleModalCenter form input[type='submit'], #exampleModalCenter form button[type='submit']");
//   const timeInput = document.getElementById("task_time_input"); // Correct ID
//   const distributionInputs = document.querySelectorAll("input[name='task[distribution]']");
//   const hiddenTime = document.getElementById("hidden_time");
//   const hiddenDistribution = document.getElementById("hidden_distribution");

//   if (openModalButton) {
//     openModalButton.addEventListener("click", function () {
//       const selectedDistribution = Array.from(distributionInputs).find(radio => radio.checked)?.value;

//       hiddenTime.value = timeInput?.value || "";
//       hiddenDistribution.value = selectedDistribution || "";

//       console.log("Pre-fill on modal open — Time:", hiddenTime.value);
//       console.log("Pre-fill on modal open — Distribution:", hiddenDistribution.value);
//     });
//   }

//   if (modalSubmitButton) {
//     modalSubmitButton.addEventListener("click", function () {
//       const selectedDistribution = Array.from(distributionInputs).find(radio => radio.checked)?.value;

//       hiddenTime.value = timeInput?.value || "";
//       hiddenDistribution.value = selectedDistribution || "";

//       console.log("On submit — Time:", hiddenTime.value);
//       console.log("On submit — Distribution:", hiddenDistribution.value);
//     });
//   }
// });
