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
        <canvas ref="chartRef" height="250"></canvas>
      </div>
    </div>
  </template>
    
  <script setup>
  import { onMounted, ref } from 'vue'
  import {
    Chart, LineController, LineElement, PointElement,
    LinearScale, Title, CategoryScale, Tooltip, Filler
  } from 'chart.js'
  
  Chart.register(LineController, LineElement, PointElement, LinearScale, Title, CategoryScale, Tooltip, Filler)
  
  const chartRef = ref(null)
  
  onMounted(() => {
    new Chart(chartRef.value.getContext('2d'), {
      type: 'line',
      data: {
        labels: ['Ene','Feb','Mar','Abr','May','Jun','Jul'],
        datasets: [{
          label: 'DAU/MAU Ratio',
          data: [0.22,0.25,0.27,0.26,0.29,0.32,0.28],
          borderColor: '#7BD08D',
          backgroundColor: 'rgba(123, 208, 141, 0.2)',
          tension: 0.4, 
          fill: true, 
          pointRadius: 4, 
          pointHoverRadius: 6,
          pointBackgroundColor: '#7BD08D',
          pointBorderColor: '#001B11',
          pointBorderWidth: 2
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            min: 0,
            max: 0.35,
            ticks: {
              callback: v => `${(v*100).toFixed(0)}%`,
              color: '#A9DBB5'
            },
            grid: {
              color: 'rgba(169, 219, 181, 0.1)'
            }
          },
          x: {
            ticks: {
              color: '#A9DBB5'
            },
            grid: {
              color: 'rgba(169, 219, 181, 0.1)'
            }
          }
        },
        plugins: {
          tooltip: {
            backgroundColor: '#002C1B',
            titleColor: '#A9DBB5',
            bodyColor: '#FFFFFF',
            borderColor: '#7BD08D',
            borderWidth: 1,
            callbacks: {
              label: ctx => `Ratio: ${(ctx.parsed.y*100).toFixed(1)}%`
            }
          },
          legend: { display: false }
        }
      }
    })
  })
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
  }
  </style>