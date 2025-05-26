
// Testing code with fixed values

// document.addEventListener("DOMContentLoaded", function () {

//   const ctx = document.getElementById('statsChart').getContext('2d');
//   const gradient = ctx.createLinearGradient(0, 0, 0, 400);
//   gradient.addColorStop(0, '#7C3AED');
//   gradient.addColorStop(1, '#3B82F6');

//   new Chart(ctx, {
//     type: 'bar',
//     data: {
//       labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
//       datasets: [{
//         label: 'Completed Tasks',
//         data: [3, 7, 4, 5, 6],
//         backgroundColor: gradient,
//         borderRadius: 10,
//         hoverBackgroundColor: '#4F46E5'
//       }]
//     },
//     options: {
//       responsive: true,
//       plugins: {
//         legend: {
//           labels: {
//             color: '#374151',
//             font: {
//               family: 'Outfit',
//               size: 14,
//               weight: 'bold'
//             }
//           }
//         },
//         tooltip: {
//           backgroundColor: '#1F2937',
//           titleColor: '#E5E7EB',
//           bodyColor: '#E5E7EB',
//           cornerRadius: 6,
//           padding: 10
//         }
//       },
//       scales: {
//         x: {
//           ticks: { color: '#4B5563', font: { family: 'Outfit', size: 13 } },
//           grid: { display: false }
//         },
//         y: {
//           beginAtZero: true,
//           ticks: { color: '#4B5563', font: { family: 'Outfit', size: 13 } },
//           grid: { color: '#E5E7EB' }
//         }
//       },
//       animation: { duration: 1000, easing: 'easeOutQuart' }
//     }
//   });
// });

// Graph Statistics in the Task Index View

document.addEventListener("DOMContentLoaded", function () {
  const canvas = document.getElementById('statsChart');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const gradient = ctx.createLinearGradient(0, 0, 0, 400);
  gradient.addColorStop(0, '#7C3AED');
  gradient.addColorStop(1, '#3B82F6');

  const taskDataElement = document.getElementById('tasks-data');
  if (!taskDataElement) return;

  const taskData = JSON.parse(taskDataElement.textContent);
  const labels = Object.keys(taskData);
  const data = Object.values(taskData);

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: 'Completed Tasks',
        data: data,
        backgroundColor: gradient,
        borderRadius: 10,
        hoverBackgroundColor: '#4F46E5'
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          labels: {
            color: '#374151',
            font: {
              family: 'Outfit',
              size: 14,
              weight: 'bold'
            }
          }
        },
        tooltip: {
          backgroundColor: '#1F2937',
          titleColor: '#E5E7EB',
          bodyColor: '#E5E7EB',
          cornerRadius: 6,
          padding: 10
        }
      },
      scales: {
        x: {
          ticks: { color: '#4B5563', font: { family: 'Outfit', size: 13 } },
          grid: { display: false }
        },
        y: {
          beginAtZero: true,
          ticks: { color: '#4B5563', font: { family: 'Outfit', size: 13 } },
          grid: { color: '#E5E7EB' }
        }
      },
      animation: { duration: 1000, easing: 'easeOutQuart' }
    }
  });
});
