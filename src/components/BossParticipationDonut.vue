<template>
    <div class="chart-wrapper">
      <div class="chart-header">
        <div>
          <h2 class="chart-title">Participación en Boss</h2>
          <p class="chart-subtitle">Distribución entre jugadores</p>
        </div>
      </div>
      <div class="chart-content">
        <v-chart :option="option" autoresize />
      </div>
    </div>
  </template>
    
  <script setup>
  import { ref } from 'vue'
  import { use } from 'echarts/core'
  import VChart from 'vue-echarts'
  import { PieChart } from 'echarts/charts'
  import { TooltipComponent, LegendComponent } from 'echarts/components'
  import { CanvasRenderer } from 'echarts/renderers'
  
  use([PieChart, TooltipComponent, LegendComponent, CanvasRenderer])
  
  // Paleta de colores Adventask
  const colors = ['#7BD08D', '#A9DBB5', '#5AB06C', '#3D9A4E', '#2C8A3D'];
  
  const option = ref({
    backgroundColor: 'transparent',
    tooltip: { 
      trigger: 'item',
      backgroundColor: '#002C1B',
      borderColor: '#7BD08D',
      borderWidth: 1,
      textStyle: {
        color: '#A9DBB5'
      }
    },
    legend: { 
      orient: 'vertical', 
      left: 'left',
      textStyle: {
        color: '#A9DBB5'
      },
      itemStyle: {
        borderColor: '#7BD08D'
      }
    },
    series: [{
      name: 'Participación',
      type: 'pie',
      radius: ['40%','70%'],
      avoidLabelOverlap: false,
      itemStyle: { 
        borderRadius: 10, 
        borderColor: '#001B11', 
        borderWidth: 2 
      },
      label: {
        show: false
      },
      emphasis: { 
        label: { 
          show: true, 
          fontSize: 16, 
          fontWeight: 'bold',
          color: '#FFFFFF'
        },
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      },
      data: [
        { value: 1048, name: 'Clan A', itemStyle: { color: colors[0] } },
        { value: 735, name: 'Clan B', itemStyle: { color: colors[1] } },
        { value: 580, name: 'Clan C', itemStyle: { color: colors[2] } },
        { value: 484, name: 'Clan D', itemStyle: { color: colors[3] } },
        { value: 300, name: 'Otros', itemStyle: { color: colors[4] } }
      ]
    }]
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
  
  .chart-content {
    flex: 1;
    position: relative;
  }
  </style>