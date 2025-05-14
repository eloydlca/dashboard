<template>
    <div class="chart-wrapper">
      <div class="chart-header">
        <div>
          <h2 class="chart-title">Uso de CPU</h2>
          <p class="chart-subtitle">Promedio por servicio</p>
        </div>
        <div class="chart-badge">+5%</div>
      </div>
      <div class="chart-content">
        <apexchart type="area" height="100%" :options="options" :series="series" />
      </div>
    </div>
    </template>
    
    <script setup>
    import { ref } from 'vue';
    import VueApexCharts from 'vue3-apexcharts';
    
    const series = ref([{ 
      name: 'CPU (%)', 
      data: [40, 45, 50, 47, 52, 48, 55] 
    }]);
    
    const options = ref({
      chart: {
        type: 'area',
        toolbar: { show: false },
        background: 'transparent',
        fontFamily: 'inherit'
      },
      xaxis: {
        categories: ['Lun','Mar','Mié','Jue','Vie','Sáb','Dom'],
        labels: { style: { colors: '#A9DBB5' } },
        axisBorder: { show: false },
        axisTicks: { show: false }
      },
      yaxis: {
        labels: { style: { colors: '#A9DBB5' } },
        min: 0,
        max: 100
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
        position: 'back'
      },
      tooltip: {
        enabled: true,
        theme: 'dark',
        style: { fontSize: '12px' },
        y: { formatter: (value) => `${value}%` }
      },
      markers: {
        size: 4,
        colors: ['#7BD08D'],
        strokeColors: '#001B11',
        strokeWidth: 2
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
      background: rgba(239, 68, 68, 0.2);
      color: #ef4444;
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