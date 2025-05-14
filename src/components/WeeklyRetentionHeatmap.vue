<template>
    <div class="chart-wrapper">
      <div class="chart-header">
        <div>
          <h2 class="chart-title">Retención Semanal</h2>
          <p class="chart-subtitle">Días activos por usuario</p>
        </div>
      </div>
      <div class="chart-content">
        <v-chart :option="option" autoresize class="heatmap-chart" />
      </div>
    </div>
  </template>
    
  <script setup>
  import { ref } from 'vue';
  import { use } from 'echarts/core';
  import VChart from 'vue-echarts';
  import { HeatmapChart } from 'echarts/charts';
  import {
    TooltipComponent,
    GridComponent,
    LegendComponent,
    VisualMapComponent
  } from 'echarts/components';
  import { CanvasRenderer } from 'echarts/renderers';
  
  use([
    HeatmapChart,
    TooltipComponent,
    GridComponent,
    LegendComponent,
    VisualMapComponent,
    CanvasRenderer
  ]);
  
  // Datos aleatorios 0–7 días activos
  const raw = [];
  for (let user = 0; user < 5; user++) {
    for (let day = 0; day < 7; day++) {
      raw.push([day, user, Math.floor(Math.random() * 8)]);
    }
  }
  
  const option = ref({
    backgroundColor: 'transparent',
    tooltip: {
      position: 'top',
      formatter: params => `Usuario ${params.value[1] + 1}<br>${params.name}: ${params.value[2]} días`,
      backgroundColor: '#002C1B',
      borderColor: '#7BD08D',
      borderWidth: 1,
      textStyle: {
        color: '#A9DBB5'
      }
    },
    grid: {
      height: '70%',
      top: '10%',
      left: '10%',
      right: '10%'
    },
    xAxis: {
      type: 'category',
      data: ['Lun','Mar','Mié','Jue','Vie','Sáb','Dom'],
      splitArea: { show: true },
      axisLine: {
        lineStyle: {
          color: 'rgba(169, 219, 181, 0.3)'
        }
      },
      axisLabel: {
        color: '#A9DBB5'
      },
      splitArea: {
        show: true,
        areaStyle: {
          color: ['rgba(0, 44, 27, 0.02)', 'rgba(0, 44, 27, 0.1)']
        }
      }
    },
    yAxis: {
      type: 'category',
      data: ['U1','U2','U3','U4','U5'],
      splitArea: { show: true },
      axisLine: {
        lineStyle: {
          color: 'rgba(169, 219, 181, 0.3)'
        }
      },
      axisLabel: {
        color: '#A9DBB5'
      },
      splitArea: {
        show: true,
        areaStyle: {
          color: ['rgba(0, 44, 27, 0.02)', 'rgba(0, 44, 27, 0.1)']
        }
      }
    },
    visualMap: {
      min: 0,
      max: 7,
      calculable: true,
      orient: 'horizontal',
      left: 'center',
      bottom: '0',
      textStyle: {
        color: '#A9DBB5'
      },
      // Colores invertidos: ahora los valores más altos son más verdes
      inRange: {
        color: ['#001B11', '#002C1B', '#2C8A3D', '#5AB06C', '#7BD08D', '#A9DBB5']
      }
    },
    series: [{
      name: 'Días activos',
      type: 'heatmap',
      data: raw,
      label: { show: false },
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }]
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
  
  .chart-content {
    flex: 1;
    position: relative;
  }
  
  .heatmap-chart {
    height: 100%;
    width: 100%;
  }
  </style>