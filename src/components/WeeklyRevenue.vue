<template>
  <div class="chart-wrapper">
    <div class="chart-header">
      <div>
        <h2 class="chart-title">Ingresos Semanales</h2>
        <p class="chart-subtitle">Comparativa de ingresos por semana</p>
      </div>
      <div class="chart-badge">+9.4%</div>
    </div>
    <div class="chart-content">
      <ApexChart type="bar" height="100%" :options="options" :series="series" />
    </div>
  </div>
</template>
  
<script setup>
import { ref } from 'vue'
import VueApexCharts from 'vue3-apexcharts'

// registrar alias para template
const ApexChart = VueApexCharts

const series = ref([{ 
  name: 'Ingresos (€)', 
  data: [12000, 13500, 11000, 15000, 17000, 16000, 17500] 
}])

const options = ref({
  chart: { 
    toolbar: { show: false },
    background: 'transparent',
    fontFamily: 'inherit',
    height: 350 // Altura explícita para el gráfico
  },
  plotOptions: {
    bar: {
      borderRadius: 6,
      columnWidth: '50%', // Reducido de 60% para barras más delgadas
      distributed: false,
      dataLabels: {
        position: 'top'
      }
    }
  },
  dataLabels: {
    enabled: true, // Activar etiquetas de datos
    formatter: (val) => `${(val/1000).toFixed(1)}K€`,
    offsetY: -20,
    style: {
      fontSize: '12px',
      colors: ['#A9DBB5']
    }
  },
  xaxis: { 
    categories: ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4', 'Semana 5', 'Semana 6', 'Semana 7'],
    labels: {
      style: {
        colors: '#A9DBB5',
        fontSize: '12px'
      },
      rotate: -45, // Rotar etiquetas para mejor legibilidad
      offsetY: 5
    },
    axisBorder: {
      show: false
    },
    axisTicks: {
      show: false
    }
  },
  yaxis: {
    labels: {
      formatter: (value) => `${(value/1000).toFixed(0)}K€`, // Formato más compacto
      style: {
        colors: '#A9DBB5',
        fontSize: '12px'
      }
    },
    min: 0,
    max: 20000, // Establecer un máximo para mejor escala
    tickAmount: 5 // Número de ticks en el eje Y
  },
  grid: {
    borderColor: 'rgba(169, 219, 181, 0.1)',
    strokeDashArray: 4,
    position: 'back',
    padding: {
      top: 20,
      right: 10,
      bottom: 10,
      left: 10
    }
  },
  colors: ['#7BD08D'],
  fill: {
    type: 'gradient',
    gradient: {
      shade: 'dark',
      type: 'vertical',
      shadeIntensity: 0.3,
      gradientToColors: ['#A9DBB5'],
      inverseColors: false,
      opacityFrom: 1,
      opacityTo: 0.8,
      stops: [0, 100]
    }
  },
  tooltip: { 
    enabled: true,
    theme: 'dark',
    style: {
      fontSize: '12px'
    },
    y: {
      formatter: (value) => `${value.toLocaleString()}€`
    }
  }
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
  min-height: 250px; /* Altura mínima para evitar que se achate */
}

@media (min-width: 992px) {
  .chart-content {
    min-height: 300px; /* Mayor altura en pantallas grandes */
  }
}
</style>