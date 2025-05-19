<template>
    <div class="chart-wrapper">
      <div class="chart-header">
        <div>
          <h2 class="chart-title">Latencia en Tiempo Real</h2>
          <p class="chart-subtitle">Últimos segundos</p>
        </div>
        <div class="chart-badge pulse">En vivo</div>
      </div>
      <div class="chart-content">
        <apexchart type="area" height="100%" :options="chartOptions" :series="series" />
      </div>
    </div>
  </template>
    
  <script setup>
  import { ref, onMounted, onBeforeUnmount } from 'vue';
  import VueApexCharts from 'vue3-apexcharts';
  
  const emit = defineEmits(['update-latency']);
  const labels = ['-25s','-20s','-15s','-10s','-5s','Ahora'];
  const series = ref([{ 
    name: 'Latencia (ms)', 
    data: [230, 220, 240, 210, 200, 190] 
  }]);
  
  const chartOptions = ref({
    chart: {
      id: 'live-latency',
      animations: {
        enabled: true,
        dynamicAnimation: { speed: 1000 }
      },
      toolbar: { show: false },
      zoom: { enabled: false },
      background: 'transparent',
      fontFamily: 'inherit',
      height: '100%'
    },
    dataLabels: { enabled: false },
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
          { offset: 0, color: '#7BD08D', opacity: 0.4 },
          { offset: 100, color: '#001B11', opacity: 0 }
        ]
      }
    },
    grid: {
      borderColor: 'rgba(169, 219, 181, 0.1)',
      strokeDashArray: 4,
      position: 'back',
      padding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
      }
    },
    xaxis: {
      categories: labels,
      labels: { 
        style: { colors: '#A9DBB5' },
        offsetY: 0
      },
      axisBorder: { show: false },
      axisTicks: { show: false }
    },
    yaxis: {
      min: 0,
      max: 500,
      labels: {
        style: { colors: '#A9DBB5' },
        formatter: (value) => `${value}ms`
      }
    },
    markers: {
      size: 4,
      colors: ['#7BD08D'],
      strokeColors: '#001B11',
      strokeWidth: 2
    },
    tooltip: {
      enabled: true,
      theme: 'dark',
      style: { fontSize: '12px' },
      y: { formatter: (value) => `${value}ms` }
    },
    legend: {
      show: false
    }
  });
  
  let intervalId;
  
  onMounted(() => {
    // Emitir el valor inicial
    emit('update-latency', series.value[0].data[series.value[0].data.length - 1]);
    
    intervalId = setInterval(() => {
      const next = Math.floor(Math.random() * 150) + 100;
      series.value = [{
        name: 'Latencia (ms)',
        data: [...series.value[0].data.slice(1), next]
      }];
      emit('update-latency', next);
    }, 5000);
  });
  
  onBeforeUnmount(() => {
    if (intervalId) clearInterval(intervalId);
  });
  </script>
    
  <style scoped>
  .chart-wrapper {
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 10px;
    box-sizing: border-box;
  }
  
  .chart-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 8px;
    flex-shrink: 0;
  }
  
  .chart-title {
    margin: 0;
    font-size: 16px;
    font-weight: 600;
    color: #A9DBB5;
    line-height: 1.2;
  }
  
  .chart-subtitle {
    margin: 2px 0 0;
    font-size: 11px;
    color: rgba(169, 219, 181, 0.7);
    line-height: 1.2;
  }
  
  .chart-badge {
    background: rgba(123, 208, 141, 0.2);
    color: #7BD08D;
    padding: 3px 6px;
    border-radius: 12px;
    font-size: 11px;
    font-weight: 600;
    position: relative;
  }
  
  .pulse::before {
    content: '';
    position: absolute;
    width: 6px;
    height: 6px;
    background-color: #7BD08D;
    border-radius: 50%;
    left: 4px;
    top: 50%;
    transform: translateY(-50%);
    animation: pulse 2s infinite;
  }
  
  @keyframes pulse {
    0% { box-shadow: 0 0 0 0 rgba(123, 208, 141, 0.7); }
    70% { box-shadow: 0 0 0 6px rgba(123, 208, 141, 0); }
    100% { box-shadow: 0 0 0 0 rgba(123, 208, 141, 0); }
  }
  
  .chart-content {
    flex: 1;
    min-height: 0; /* Crucial para que el gráfico se ajuste al contenedor */
    position: relative;
  }
  </style>