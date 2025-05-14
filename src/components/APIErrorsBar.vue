<template>
    <div class="chart-wrapper">
      <div class="chart-header">
        <div>
          <h2 class="chart-title">Errores 500</h2>
          <p class="chart-subtitle">Errores por día</p>
        </div>
        <div class="chart-badge">-33%</div>
      </div>
      <div class="chart-content">
        <canvas ref="chartRef"></canvas>
      </div>
    </div>
    </template>
    
    <script setup>
    import { onMounted, ref, onBeforeUnmount } from 'vue';
    import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, BarController } from 'chart.js';
    
    Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, BarController);
    
    const chartRef = ref(null);
    let chartInstance = null;
    
    onMounted(() => {
      chartInstance = new Chart(chartRef.value.getContext('2d'), {
        type: 'bar',
        data: {
          labels: ['Lun','Mar','Mié','Jue','Vie','Sáb','Dom'],
          datasets: [{
            label: 'Errores 500',
            data: [5,9,3,6,2,1,0],
            backgroundColor: 'rgba(239, 68, 68, 0.7)',
            borderColor: 'rgba(239, 68, 68, 1)',
            borderWidth: 1,
            borderRadius: 4,
            hoverBackgroundColor: 'rgba(239, 68, 68, 0.9)'
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: {
              backgroundColor: '#002C1B',
              titleColor: '#A9DBB5',
              bodyColor: '#FFFFFF',
              borderColor: '#7BD08D',
              borderWidth: 1,
              callbacks: { label: ctx => `Errores: ${ctx.parsed.y}` }
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              ticks: { stepSize: 1, color: '#A9DBB5' },
              grid: { color: 'rgba(169, 219, 181, 0.1)' }
            },
            x: {
              ticks: { color: '#A9DBB5' },
              grid: { color: 'rgba(169, 219, 181, 0.1)' }
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