<template>
  <div class="chart-wrapper">
    <div class="chart-header">
      <div>
        <h2 class="chart-title">MAU Ratio</h2>
        <p class="chart-subtitle">Engagement promedio de usuarios activos</p>
      </div>
      <div class="chart-badge">-12.5%</div>
    </div>
    <div class="chart-content">
      <canvas ref="chartRef"></canvas>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import {
  Chart,
  BubbleController,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
} from 'chart.js';

Chart.register(
  BubbleController,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

const chartRef = ref(null);
let chartInstance = null;

onMounted(() => {
  const rawPoints = [
    { x: 0, y: 0.22, rawValue: 50 },
    { x: 1, y: 0.25, rawValue: 56.8 },
    { x: 2, y: 0.27, rawValue: 61.3 },
    { x: 3, y: 0.26, rawValue: 59 },
    { x: 4, y: 0.29, rawValue: 65.9 },
    { x: 5, y: 0.32, rawValue: 72.7 },
    { x: 6, y: 0.28, rawValue: 63.6 }
  ];

  const dataPoints = rawPoints.map(p => ({
    x: p.x,
    y: p.y,
    r: p.rawValue / 3,
    rawValue: p.rawValue
  }));

  chartInstance = new Chart(chartRef.value.getContext('2d'), {
    type: 'bubble',
    data: {
      datasets: [
        {
          label: 'MAU Ratio',
          data: dataPoints,
          backgroundColor: 'rgba(123, 208, 141, 0.7)',
          borderColor: 'rgba(123, 208, 141, 1)'
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      layout: {
        padding: {
          top: 10,
          bottom: 20,
          left: 5,
          right: 5
        }
      },
      scales: {
        x: {
          type: 'category',
          labels: ['Ene','Feb','Mar','Abr','May','Jun','Jul'],
          ticks: { 
            color: '#A9DBB5',
            font: { size: 10 },
            padding: 5
          },
          grid: { color: 'rgba(169, 219, 181, 0.1)' }
        },
        y: {
          beginAtZero: true,
          min: 0,
          max: 0.40,
          ticks: {
            callback: v => `${(v * 100).toFixed(0)}%`,
            color: '#A9DBB5',
            stepSize: 0.10,
            font: { size: 10 },
            padding: 5
          },
          grid: { color: 'rgba(169, 219, 181, 0.1)' }
        }
      },
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: '#002C1B',
          titleColor: '#A9DBB5',
          bodyColor: '#FFFFFF',
          borderColor: '#7BD08D',
          borderWidth: 1,
          callbacks: {
            label: ctx => {
              const ratio = (ctx.raw.y * 100).toFixed(1);
              const users = ctx.raw.rawValue * 10;
              return `Ratio: ${ratio}% — Usuarios: ${users}`;
            }
          }
        }
      }
    }
  });
});

onBeforeUnmount(() => {
  if (chartInstance) {
    chartInstance.destroy();
  }
});
</script>

<style scoped>
.chart-wrapper {
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 12px;
}
.chart-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 8px;
}
.chart-title {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: #A9DBB5;
}
.chart-subtitle {
  margin: 2px 0 0;
  font-size: 11px;
  color: rgba(169, 219, 181, 0.7);
}
.chart-badge {
  background: rgb(171, 79, 73);
  color: #cfe2cc;
  padding: 3px 6px;
  border-radius: 16px;
  font-size: 11px;
  font-weight: 600;
}
.chart-content {
  flex: 1;
  position: relative;
  min-height: 0;
}
</style>
