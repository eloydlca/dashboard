<template>
    <div class="chart-wrapper">
      <div class="chart-header">
        <div>
          <h2 class="chart-title">Jugadores Activos</h2>
          <p class="chart-subtitle">En tiempo real</p>
        </div>
        <div class="chart-badge pulse">En vivo</div>
      </div>
      <div class="chart-content">
        <VueApexCharts
          type="area"
          height="100%"
          :options="chartOptions"
          :series="series"
        />
      </div>
    </div>
  </template>
    
  <script setup>
  import { ref, onMounted, onBeforeUnmount, defineEmits } from 'vue'
  import VueApexCharts from 'vue3-apexcharts'
  
  const emit = defineEmits(['update-players'])
  
  const labels = ['-25s','-20s','-15s','-10s','-5s','Ahora']
  const series = ref([{ 
    name: 'Jugadores activos', 
    data: [450, 480, 500, 520, 510, 530] 
  }])
  
  const chartOptions = ref({
    chart: { 
      id: 'live-players', 
      animations: { 
        enabled: true, 
        dynamicAnimation: { speed: 1000 } 
      }, 
      toolbar: { show: false }, 
      zoom: { enabled: false },
      background: 'transparent',
      fontFamily: 'inherit'
    },
    dataLabels: {
      enabled: false
    },
    stroke: { 
      curve: 'smooth', 
      width: 3,
      colors: ['#7BD08D']
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.2,
        stops: [0, 90, 100],
        colorStops: [
          {
            offset: 0,
            color: '#7BD08D',
            opacity: 0.4
          },
          {
            offset: 100,
            color: '#001B11',
            opacity: 0
          }
        ]
      }
    },
    grid: {
      borderColor: 'rgba(169, 219, 181, 0.1)',
      strokeDashArray: 4,
      position: 'back'
    },
    xaxis: { 
      categories: labels, 
      labels: {
        style: {
          colors: '#A9DBB5'
        }
      },
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      }
    },
    yaxis: { 
      min: 400, 
      max: 600, 
      labels: {
        style: {
          colors: '#A9DBB5'
        }
      }
    },
    markers: { 
      size: 5,
      colors: ['#7BD08D'],
      strokeColors: '#001B11',
      strokeWidth: 2
    },
    tooltip: { 
      enabled: true, 
      theme: 'dark',
      style: {
        fontSize: '12px'
      },
      x: {
        show: false
      }
    }
  })
  
  let intervalId
  onMounted(() => {
    intervalId = setInterval(() => {
      const next = Math.floor(Math.random() * 100) + 450  // 450–550
      series.value[0].data.push(next)
      series.value[0].data.shift()
      
      // Emitir el valor actual para actualizar el KPI
      emit('update-players', next)
    }, 5000)
  })
  
  onBeforeUnmount(() => clearInterval(intervalId))
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
    position: relative;
  }
  
  .pulse::before {
    content: '';
    position: absolute;
    width: 8px;
    height: 8px;
    background-color: #7BD08D;
    border-radius: 50%;
    left: 4px;
    top: 50%;
    transform: translateY(-50%);
    animation: pulse 2s infinite;
  }
  
  @keyframes pulse {
    0% {
      box-shadow: 0 0 0 0 rgba(123, 208, 141, 0.7);
    }
    70% {
      box-shadow: 0 0 0 10px rgba(123, 208, 141, 0);
    }
    100% {
      box-shadow: 0 0 0 0 rgba(123, 208, 141, 0);
    }
  }
  
  .chart-content {
    flex: 1;
    position: relative;
  }
  </style>