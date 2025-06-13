function startFocusTimer() {
  let taskName = document.querySelector('.focus-content h2')?.textContent?.trim();
  let duration;
  if (taskName === "Open the Web Portal") {
      duration = 10;
    } else {
      duration = parseInt(document.querySelector('input[name="duration"]').value || "25", 10) * 60;
    }
  // let duration = parseInt(document.querySelector('input[name="duration"]').value || "25", 10) * 60;
  const display = document.getElementById('focus-timer');
  const finishBtn = document.getElementById('finish-btn');
  const form = document.getElementById("focus-form");
  let timerId = null;
  let elapsed = 0;
  const sound = document.getElementById("notification-sound");
  let actionToConfirm = null;
  let selectedRating = 5;
  let selectedStatus = "Completed";

  // Set timers for each subtask
  if (typeof subtasks !== "undefined") {
    let cumulative = 0;

    subtasks.forEach((subtask, index) => {
      cumulative += subtask.time * 60;

      setTimeout(() => {
        // Skip sound if it's the last subtask
        if (index < subtasks.length - 1) {
          sound.play();
        }
        const popup = new bootstrap.Modal(document.getElementById(`subtaskModal${index}`));
        popup.show();
      }, cumulative * 1000);
    });
  }

  function finalizeStatistic() {
    const endTimeInput = document.querySelector('input[name="end_time"]');
    const performanceInput = document.querySelector('input[name="input_performance"]');

    const now = new Date().toISOString();
    endTimeInput.value = now;

    const startTime = new Date(document.querySelector('input[name="start_time"]').value);
    const endTime = new Date();
    const taskTimeInMinutes = parseInt(document.querySelector('input[name="duration"]').value || "25", 10);
    const accomplishTimeInMinutes = (endTime - startTime) / 60000.0;
    let timeUsage = 1 - ((taskTimeInMinutes - accomplishTimeInMinutes) / taskTimeInMinutes);
    timeUsage = Math.max(0, Math.min(timeUsage, 1)); // Clamp between 0 and 1
    let effectiveness = 1 - ((0.2 * timeUsage) - 0.16); // To be modified if higher achievement standards are expected.
    effectiveness = Math.max(0, Math.min(effectiveness, 1)); // Clamp
    const performance = Math.round(effectiveness * 100);
    performanceInput.value = performance;

    document.querySelectorAll('input[name="subtask_stats[][end_time]"]').forEach(input => input.value = now);
  }

  function updateTimer() {
    let h = Math.floor(duration / 3600);
    let m = Math.floor((duration % 3600) / 60);
    let s = duration % 60;
    display.textContent = `${h.toString().padStart(2,'0')}:${m.toString().padStart(2,'0')}:${s.toString().padStart(2,'0')}`;
    if (duration > 0) {
      duration--;
      elapsed++;
      timerId = setTimeout(updateTimer, 1000);
    } else {
      finalizeStatistic();
      finishBtn.classList.remove("d-none");
      sound.play();
      let endModal = new bootstrap.Modal(document.getElementById('endTaskModal'));
      endModal.show();
    }
  }

  if (window.focusPanelTimerId) clearTimeout(window.focusPanelTimerId);
  window.focusPanelTimerId = setTimeout(updateTimer, 0);

  // Send Stats
  finishBtn.addEventListener("click", () => {
    actionToConfirm = "submit";
    confirmationModal.show();
  });

  const confirmationModal = new bootstrap.Modal(document.getElementById("confirmationModal"));

  document.getElementById("trigger-exit")?.addEventListener("click", function () {
    actionToConfirm = "exit";
    confirmationModal.show();
  });

  document.getElementById("trigger-submit")?.addEventListener("click", function () {
    actionToConfirm = "submit";
    confirmationModal.show();
  });

  document.getElementById("confirmAction")?.addEventListener("click", function () {
    if (actionToConfirm === "submit") {
      finalizeStatistic();
      document.getElementById("focus-form").submit();
    } else if (actionToConfirm === "exit") {
      window.location.href = "/tasks";
    }
  });

  // Set rating buttons
  document.querySelectorAll(".rating-btn").forEach(button => {
    button.addEventListener("click", () => {
      selectedRating = parseInt(button.dataset.rating, 10);
      document.querySelectorAll(".rating-btn").forEach(b => b.classList.remove("active"));
      button.classList.add("active");
    });
  });

  // Set status buttons
  document.querySelectorAll(".status-btn").forEach(button => {
    button.addEventListener("click", () => {
      selectedStatus = button.dataset.status;
      document.querySelectorAll(".status-btn").forEach(b => b.classList.remove("selected"));
      button.classList.add("selected");
    });
  });

  // Confirm feedback and submit
  document.getElementById("submit-feedback-btn").addEventListener("click", () => {
    document.querySelector('input[name="input_rating"]').value = selectedRating;
    document.querySelector('input[name="input_status"]').value = selectedStatus;

    confirmationModal.hide();
    finalizeStatistic();
    form.submit();
  });
}

document.addEventListener("turbo:load", startFocusTimer);
document.addEventListener("DOMContentLoaded", startFocusTimer);
