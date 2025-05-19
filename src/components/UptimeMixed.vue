<template>
  <div class="chart-wrapper">
    <div class="chart-header">
      <div>
        <h2 class="chart-title">Uptime de Servidores</h2>
        <p class="chart-subtitle">Comparativa de porcentaje de uptime y número de incidencias semanales</p>
      </div>
      <div class="chart-badge">+0.02%</div>
    </div>
    <div class="chart-content">
      <apexchart
        type="line"
        height="100%"
        :options="chartOptions"
        :series="series"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import VueApexCharts from 'vue3-apexcharts';

const series = ref([
  {
    name: 'Uptime (%)',
    type: 'column',
    data: [99.6, 99.8, 99.95, 99.88, 99.96, 99.97, 99.99]
  },
  {
    name: 'Incidencias',
    type: 'line',
    data: [5, 9, 3, 6, 2, 1, 0]
  }
]);

const chartOptions = ref({
  chart: {
    type: 'line',
    toolbar: { show: false },
    background: 'transparent',
    fontFamily: 'inherit'
  },
  stroke: { width: [0, 3], curve: 'smooth' },
  colors: ['#7BD08D', '#A9DBB5'],
  dataLabels: { enabled: false },
  labels: ['Lun','Mar','Mié','Jue','Vie','Sáb','Dom'],
  xaxis: {
    type: 'category',
    labels: { style: { colors: '#A9DBB5' } },
    axisBorder: { show: false },
    axisTicks: { show: false }
  },
  yaxis: [
    {
      title: {
        text: 'Uptime (%)',
        style: { color: '#7BD08D' }
      },
      labels: { style: { colors: '#A9DBB5' } },
      min: 99,
      max: 100
    },
    {
      opposite: true,
      title: {
        text: 'Incidencias',
        style: { color: '#A9DBB5' }
      },
      labels: { style: { colors: '#A9DBB5' } },
      min: 0,
      max: 10
    }
  ],
  grid: {
    borderColor: 'rgba(169, 219, 181, 0.1)',
    strokeDashArray: 4,
    position: 'back'
  },
  tooltip: {
    shared: true,
    intersect: false,
    theme: 'dark',
    style: { fontSize: '12px' }
  },
  plotOptions: {
    bar: {
      borderRadius: 6,
      columnWidth: '60%',
      dataLabels: { position: 'top' }
    }
  },
  markers: {
    size: 4,
    colors: ['transparent', '#A9DBB5'],
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
  height: 300px;
  min-height: 300px;
}
</style>
