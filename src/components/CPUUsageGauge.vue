<template>
  <div class="chart-wrapper">
    <div class="chart-header">
      <div>
        <h2 class="chart-title">Uso de CPU</h2>
        <p class="chart-subtitle">Promedio actual de CPU</p>
      </div>
      <div class="chart-badge">{{ value }}%</div>
    </div>
    <div class="chart-content">
      <v-chart :option="option" autoresize class="gauge-chart" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { use } from 'echarts/core';
import VChart from 'vue-echarts';
import { GaugeChart } from 'echarts/charts';
import {
  TooltipComponent,
  TitleComponent
} from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';

use([GaugeChart, TooltipComponent, TitleComponent, CanvasRenderer]);

const value = ref(0);

onMounted(() => {
  value.value = Math.floor(Math.random() * 40) + 30;
  option.value.series[0].data[0].value = value.value;
  
  setTimeout(() => {
    const chartInstance = document.querySelector('.gauge-chart').__vue__;
    if (chartInstance && chartInstance.resize) {
      chartInstance.resize();
    }
  }, 100);
});

const option = ref({
  backgroundColor: 'transparent',
  tooltip: {
    formatter: '{a} <br/>Valor: {c}%'
  },
  grid: {
    top: 10,
    bottom: 10,
    left: 10,
    right: 10,
    containLabel: true
  },
  series: [
    {
      name: 'CPU',
      type: 'gauge',
      startAngle: 200,
      endAngle: -20,
      min: 0,
      max: 100,
      splitNumber: 10,
      radius: '75%', 
      center: ['50%', '60%'], 
      progress: {
        show: true,
        width: 8 
      },
      axisLine: {
        lineStyle: {
          width: 8, 
          color: [
            [0.3, '#5AB06C'],
            [0.7, '#7BD08D'],
            [1, '#A9DBB5']
          ]
        }
      },
      pointer: {
        itemStyle: {
          color: '#7BD08D'
        },
        length: '60%',
        width: 5
      },
      axisTick: {
        distance: -12,
        length: 6, 
        lineStyle: {
          color: '#A9DBB5'
        }
      },
      splitLine: {
        distance: -14, 
        length: 12, 
        lineStyle: {
          color: '#A9DBB5',
          width: 2
        }
      },
      axisLabel: {
        distance: -34, 
        color: '#A9DBB5',
        fontSize: 10, 
        formatter: function(value) {
          if (value % 20 === 0) {
            return value;
          }
          return '';
        }
      },
      detail: {
        valueAnimation: true,
        formatter: '{value}%',
        color: '#7BD08D',
        fontSize: 18,
        offsetCenter: [0, '30%']
      },
      data: [{ value: 0, name: 'CPU (%)' }]
    }
  ]
});
</script>

<style scoped>
.chart-wrapper {
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 12px;
  box-sizing: border-box;
}
.chart-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 8px; 
}
.chart-title {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: #A9DBB5;
}
.chart-subtitle {
  margin: 2px 0 0; 
  font-size: 11px; 
  color: rgba(169, 219, 181, 0.7);
}
.chart-badge {
  background: rgba(123, 208, 141, 0.2);
  color: #7BD08D;
  padding: 3px 6px;
  border-radius: 16px;
  font-size: 11px; 
  font-weight: 600;
}
.chart-content {
  flex: 1;
  position: relative;
  min-height: 200px;
  padding: 10px; 
}
.gauge-chart {
  width: 100%;
  height: 100%;
  min-height: 200px;
}

@media (max-width: 768px) {
  .chart-content {
    min-height: 250px;
    padding: 15px;
  }
  .gauge-chart {
    min-height: 250px;
  }
}
</style>