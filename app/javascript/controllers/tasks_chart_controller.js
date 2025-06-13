// Chart Statistics in the Task Index View

import { Controller } from "@hotwired/stimulus";
import Chart from 'chart.js/auto';
import zoomPlugin from 'chartjs-plugin-zoom';

Chart.register(zoomPlugin);

export default class extends Controller {
  static targets = ["canvas", "data"];

  connect() {
    this.loadChart();
  }

  disconnect() {
    if (this.chart) {
      try {
        this.chart.destroy();
      } catch (e) {}
      this.chart = null;
    }
  }

  loadChart() {
    if (!this.hasCanvasTarget || !this.hasDataTarget) return;

    const ctx = this.canvasTarget.getContext("2d");

    const today = new Date();
    const last5Dates = [];
    for (let i = 4; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(today.getDate() - i);
      last5Dates.push(d);
    }

    const chartData = JSON.parse(this.dataTarget.textContent);
    const labels = last5Dates.map(d => d.toLocaleDateString(undefined, { weekday: "long" }));
    const values = last5Dates.map(d => {
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
      return chartData[key] || 0;
    });

    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, "#5f68c3");
    gradient.addColorStop(0.5, "#a18cd1");
    gradient.addColorStop(1, "#4fc3f7");

    this.chart = new Chart(ctx, {
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
        hover: {
          mode: "nearest",
          intersect: true,
          animationDuration: 0
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: { color: "#dbe2ef" },
            ticks: { color: "#112D4E" }
          },
          x: {
            grid: { display: false },
            ticks: { color: "#112D4E" }
          }
        }
      }
    });
  }
}
