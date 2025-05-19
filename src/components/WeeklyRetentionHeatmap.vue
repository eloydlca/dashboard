<template>
  <div class="chart-wrapper">
    <div class="chart-header">
      <div>
        <h2 class="chart-title">Retención Semanal</h2>
        <p class="chart-subtitle">Días activos promedio</p>
      </div>
    </div>
    <div class="chart-content">
      <v-chart :option="option" autoresize class="heatmap-chart" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { use } from 'echarts/core'
import VChart from 'vue-echarts'
import { HeatmapChart } from 'echarts/charts'
import {
  TooltipComponent,
  GridComponent,
  LegendComponent,
  VisualMapComponent
} from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'

use([
  HeatmapChart,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  VisualMapComponent,
  CanvasRenderer
])

// Datos fijos de retención diaria promedio por clan (0–7 días)
const raw = [
  // Lunes
  [0, 0, 7], [0, 1, 6], [0, 2, 5], [0, 3, 4], [0, 4, 3],
  // Martes
  [1, 0, 7], [1, 1, 6], [1, 2, 5], [1, 3, 4], [1, 4, 3],
  // Miércoles
  [2, 0, 6], [2, 1, 5], [2, 2, 4], [2, 3, 3], [2, 4, 2],
  // Jueves
  [3, 0, 6], [3, 1, 5], [3, 2, 4], [3, 3, 3], [3, 4, 2],
  // Viernes
  [4, 0, 7], [4, 1, 6], [4, 2, 5], [4, 3, 4], [4, 4, 3],
  // Sábado
  [5, 0, 5], [5, 1, 4], [5, 2, 3], [5, 3, 2], [5, 4, 1],
  // Domingo
  [6, 0, 5], [6, 1, 4], [6, 2, 3], [6, 3, 2], [6, 4, 1],
]

const option = ref({
  backgroundColor: 'transparent',
  tooltip: {
    position: 'top',
    formatter: params => {
      const clans = ['Clan A','Clan B','Clan C','Clan D','Otros']
      return `${clans[params.value[1]]}<br>${params.name}: ${params.value[2]} días`
    },
    backgroundColor: '#002C1B',
    borderColor: '#7BD08D',
    borderWidth: 1,
    textStyle: {
      color: '#A9DBB5'
    }
  },
  grid: {
    height: '65%',
    top: '10%',
    left: '10%',
    right: '5%',
    bottom: '20%'
  },
  xAxis: {
    type: 'category',
    data: ['Lun','Mar','Mié','Jue','Vie','Sáb','Dom'],
    splitArea: { show: true },
    axisLine: { lineStyle: { color: 'rgba(169, 219, 181, 0.3)' } },
    axisLabel: { color: '#A9DBB5', fontSize: 10, margin: 8, rotate: 0 },
    splitArea: { show: true, areaStyle: { color: ['rgba(0, 44, 27, 0.02)','rgba(0, 44, 27, 0.1)'] } }
  },
  yAxis: {
    type: 'category',
    data: ['Clan A','Clan B','Clan C','Clan D','Otros'],
    splitArea: { show: true },
    axisLine: { lineStyle: { color: 'rgba(169, 219, 181, 0.3)' } },
    axisLabel: { color: '#A9DBB5', fontSize: 10, margin: 8 },
    splitArea: { show: true, areaStyle: { color: ['rgba(0, 44, 27, 0.02)','rgba(0, 44, 27, 0.1)'] } }
  },
  visualMap: {
    min: 0,
    max: 7,
    calculable: true,
    orient: 'horizontal',
    left: 'center',
    bottom: '5%',
    itemWidth: 12,
    itemHeight: 80,
    textStyle: { color: '#A9DBB5', fontSize: 10 },
    inRange: {
      color: ['#A9DBB5','#7BD08D','#5AB06C','#2C8A3D','#002C1B','#001B11']
    }
  },
  series: [{
    name: 'Días activos',
    type: 'heatmap',
    data: raw,
    label: { show: false },
    emphasis: { itemStyle: { shadowBlur: 10, shadowColor: 'rgba(0, 0, 0, 0.5)' } },
    itemStyle: { borderWidth: 1, borderColor: 'rgba(0, 27, 17, 0.5)' }
  }]
})
</script>

<style scoped>
.chart-wrapper {
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 12px;
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

.chart-content {
  flex: 1;
  position: relative;
  min-height: 0;
}

.heatmap-chart {
  width: 100%;
  height: 100%;
}
</style>