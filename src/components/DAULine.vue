<template>
  <div class="chart-wrapper">
    <div class="chart-header">
      <div>
        <h2 class="chart-title">DAU/MAU Ratio</h2>
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
  const dataPoints = [
    // x as category index, y as ratio, r as bubble radius
    { x: 0, y: 0.22, r: 10 },
    { x: 1, y: 0.25, r: 12 },
    { x: 2, y: 0.27, r: 14 },
    { x: 3, y: 0.26, r: 13 },
    { x: 4, y: 0.29, r: 15 },
    { x: 5, y: 0.32, r: 16 },
    { x: 6, y: 0.28, r: 14 }
  ];

  chartInstance = new Chart(chartRef.value.getContext('2d'), {
    type: 'bubble',
    data: {
      datasets: [
        {
          label: 'DAU/MAU Ratio',
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
          top: 20,    // Añadir padding superior
          bottom: 10, // Añadir padding inferior
          left: 10,   // Añadir padding izquierdo
          right: 10   // Añadir padding derecho
        }
      },
      scales: {
        x: {
          type: 'category',
          labels: ['Ene','Feb','Mar','Abr','May','Jun','Jul'],
          ticks: { color: '#A9DBB5' },
          grid: { color: 'rgba(169, 219, 181, 0.1)' }
        },
        y: {
          beginAtZero: true,
          min: 0,
          max: 0.40, // Aumentado de 0.35 a 0.40 para dar más espacio a las burbujas
          ticks: {
            callback: v => `${(v * 100).toFixed(0)}%`,
            color: '#A9DBB5',
            stepSize: 0.10 // Definir pasos de 10% para mejor legibilidad
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
              const v = ctx.raw;
              return `Ratio: ${(v.y * 100).toFixed(1)}% — Usuarios: ${v.r * 10}`;
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
  background: rgb(171, 79, 73);
  color: #cfe2cc;
  padding: 4px 8px;
  border-radius: 16px;
  font-size: 12px;
  font-weight: 600;
}
.chart-content {
  flex: 1;
  position: relative;
  min-height: 250px; /* Altura mínima para evitar que se achate */
}

@media (min-width: 992px) {
  .chart-content {
    min-height: 300px; /* Mayor altura en pantallas grandes */
  }
}
</style>