<template>
    <div class="chart-wrapper">
      <div class="chart-header">
        <div>
          <h2 class="chart-title">Deploys Exitosos</h2>
          <p class="chart-subtitle">Últimos 7 meses</p>
        </div>
        <div class="chart-badge">-30%</div>
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
          labels: ['Ene','Feb','Mar','Abr','May','Jun', 'Jul'],
          datasets: [{
            label: 'Deploys',
            data: [5, 7, 6, 9, 8, 10, 7],
            backgroundColor: 'rgba(123, 208, 141, 0.7)',
            borderColor: 'rgba(123, 208, 141, 1)',
            borderWidth: 1,
            borderRadius: 4,
            hoverBackgroundColor: 'rgba(123, 208, 141, 0.9)'
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
              callbacks: { label: ctx => `Deploys: ${ctx.parsed.y}` }
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
      height: 300px;
      min-height: 300px;
    }
    </style>