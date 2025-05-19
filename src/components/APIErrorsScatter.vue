<template>
  <div class="chart-wrapper">
    <div class="chart-header">
      <div>
        <h2 class="chart-title">Errores 500</h2>
        <p class="chart-subtitle">Scatter Plot de errores por día</p>
      </div>
      <div class="chart-badge">-100%</div>
    </div>
    <div class="chart-content">
      <canvas ref="chartRef"></canvas>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, onBeforeUnmount } from 'vue';
import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  ScatterController
} from 'chart.js';

Chart.register(CategoryScale, LinearScale, PointElement, Tooltip, Legend, ScatterController);

const chartRef = ref(null);
let chartInstance = null;

onMounted(() => {
  const dataPoints = [
    { x: 'Lun', y: 5 },
    { x: 'Mar', y: 9 },
    { x: 'Mié', y: 3 },
    { x: 'Jue', y: 6 },
    { x: 'Vie', y: 2 },
    { x: 'Sáb', y: 1 },
    { x: 'Dom', y: 0 }
  ];

  chartInstance = new Chart(chartRef.value.getContext('2d'), {
    type: 'scatter',
    data: {
      datasets: [{
        label: 'Errores 500',
        data: dataPoints,
        backgroundColor: 'rgba(239, 68, 68, 0.7)',
        borderColor: 'rgba(239, 68, 68, 1)',
        pointRadius: 8,
        hoverRadius: 10
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          type: 'category',
          labels: ['Lun','Mar','Mié','Jue','Vie','Sáb','Dom'],
          ticks: { color: '#A9DBB5' },
          grid: { color: 'rgba(169, 219, 181, 0.1)' }
        },
        y: {
          beginAtZero: true,
          ticks: { stepSize: 1, color: '#A9DBB5' },
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
            label: ctx => `Errores: ${ctx.parsed.y}`
          }
        }
      }
    }
  });
});

onBeforeUnmount(() => {
  if (chartInstance) chartInstance.destroy();
});
</script>

<style scoped>
.chart-wrapper {
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 16px;
}
.chart-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
}
.chart-title {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: #A9DBB5;
}
.chart-subtitle {
  margin: 4px 0 0;
  font-size: 12px;
  color: rgba(169, 219, 181, 0.7);
}
.chart-badge {
  background: rgba(123, 208, 141, 0.2);
  color: #7BD08D;
  padding: 4px 8px;
  border-radius: 16px;
  font-size: 12px;
  font-weight: 600;
}
.chart-content {
  flex: 1;
  position: relative;
  height: 300px;
  min-height: 300px;
}
</style>