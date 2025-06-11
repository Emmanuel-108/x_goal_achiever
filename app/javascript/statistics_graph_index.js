// Tasks#index chart

function loadStatsChart() {
  const canvas = document.getElementById("statsChart");
  if (!canvas) return;

  if (window.statsChartInstance) {
    try { window.statsChartInstance.destroy(); } catch(e) {}
    window.statsChartInstance = null;
  }

  const dataElement = document.getElementById("tasks-data");
  if (!dataElement) return;

  const today = new Date();
  const last5Dates = [];

  for (let i = 4; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    last5Dates.push(d);
  }

  const chartData = JSON.parse(dataElement.textContent);
  const labels = last5Dates.map(d => d.toLocaleDateString(undefined, { weekday: 'long' }));
  const values = last5Dates.map(d => {
    const localKey = d.getFullYear() + '-' +
                    String(d.getMonth() + 1).padStart(2, '0') + '-' +
                    String(d.getDate()).padStart(2, '0');
    return chartData[localKey] || 0;
  });

  // Degradation colors
  const ctx = canvas.getContext("2d");
  let gradient = ctx.createLinearGradient(0, 0, 0, 400);
  gradient.addColorStop(0, "#5f68c3");
  gradient.addColorStop(0.5, "#a18cd1");
  gradient.addColorStop(1, "#4fc3f7");

  window.statsChartInstance = new Chart(ctx, {
    type: "bar",
    data: {
      labels: labels,
      datasets: [{
        label: "Created Tasks",
        data: values,
        backgroundColor: gradient,
        borderColor: "#5f68c3",
        borderWidth: 1.5,
        borderRadius: 8
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      animation: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          enabled: true,
          mode: "index",
          intersect: false,
          animation: false
        },
        zoom: {
          zoom: {
            wheel: { enabled: true },
            pinch: { enabled: true },
            mode: "x"
          },
          pan: { enabled: true, mode: "x" }
        }
      },
      hover: { mode: "nearest", intersect: true, animationDuration: 0 },
      scales: {
        y: {
          beginAtZero: true,
          grid: { color: "#dbe2ef" },
          ticks: { color: "#112D4E" },
          title: {
            display: false,
            text: 'Created Tasks',
            color: '#112D4E',
            font: { size: 14, weight: 'bold' },
            padding: { bottom: 10 },
            rotation: -90,
            align: 'center',
            position: 'top'
          }
        },
        x: {
          grid: { display: false },
          ticks: { color: "#112D4E" }
        }
      }
    }
  });
}
document.addEventListener("turbo:load", loadStatsChart);
document.addEventListener("DOMContentLoaded", loadStatsChart);
