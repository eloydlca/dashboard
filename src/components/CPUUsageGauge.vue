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

// Generar un valor de CPU aleatorio entre 30% y 70% para simular datos
onMounted(() => {
  value.value = Math.floor(Math.random() * 40) + 30;
  option.value.series[0].data[0].value = value.value;
});

const option = ref({
  tooltip: {
    formatter: '{a} <br/>Valor: {c}%'
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
      progress: {
        show: true,
        width: 10
      },
      axisLine: {
        lineStyle: {
          width: 10,
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
        }
      },
      axisTick: {
        distance: -15,
        length: 8,
        lineStyle: {
          color: '#A9DBB5'
        }
      },
      splitLine: {
        distance: -16,
        length: 16,
        lineStyle: {
          color: '#A9DBB5',
          width: 2
        }
      },
      axisLabel: {
        distance: -30,
        color: '#A9DBB5',
        fontSize: 12
      },
      detail: {
        valueAnimation: true,
        formatter: '{value}%',
        color: '#7BD08D'
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
}
.gauge-chart {
  width: 100%;
  height: 100%;
}
</style>