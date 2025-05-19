<!-- pages/TecnicoPage.vue -->

<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar class="toolbar">
        <ion-buttons slot="start">
          <ion-menu-button color="light" />
        </ion-buttons>
        <ion-title>📈 Dashboard Técnico</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="dashboard-content">
      <div class="dashboard-container">
        <!-- Layout principal con grid asimétrico -->
        <div class="main-grid">
          <!-- Panel izquierdo: KPIs y latencia -->
          <div class="left-panel">
            <!-- KPIs en formato vertical con spark-lines -->
            <div class="kpi-column">
              <!-- Latencia Actual -->
              <div class="kpi-card">
                <spark-line
                  title="LATENCIA"
                  :value="currentLatency + 'ms'"
                  :chartOptions="sparkLatencyOptions"
                  :chartSeries="sparkLatencySeries"
                  bgColor="rgba(0,44,27,0.7)"
                  textColor="#7BD08D"
                  iconName="navigate-outline"
                  padding="20px"
                  iconSize="1.2rem"
                  titleFontSize="0.7rem"
                  valueFontSize="1.8rem"
                  detailsGap="4px"
                  iconTitleGap="3px"
                />
              </div>
              <!-- Uptime Servidores -->
              <div class="kpi-card">
                <spark-line
                  title="UPTIME"
                  value="99.9%"
                  :chartOptions="sparkUptimeOptions"
                  :chartSeries="sparkUptimeSeries"
                  bgColor="rgba(0,44,27,0.7)"
                  textColor="#A9DBB5"
                  iconName="logo-ionic"
                  padding="20px"
                  iconSize="1.2rem"
                  titleFontSize="0.7rem"
                  valueFontSize="1.8rem"
                  detailsGap="4px"
                  iconTitleGap="3px"
                />
              </div>
              <!-- Errores 500 Hoy -->
              <div class="kpi-card">
                <spark-line
                  title="ERRORS 500"
                  value="3"
                  :chartOptions="sparkErrorsOptions"
                  :chartSeries="sparkErrorsSeries"
                  bgColor="rgba(0,44,27,0.7)"
                  textColor="#EE9AE5"
                  iconName="warning-outline"
                  padding="20px"
                  iconSize="1.2rem"
                  titleFontSize="0.7rem"
                  valueFontSize="1.8rem"
                  detailsGap="4px"
                  iconTitleGap="3px"
                />
              </div>
              <!-- Deploys Exitosos -->
              <div class="kpi-card">
                <spark-line
                  title="DEPLOYS"
                  value="10"
                  :chartOptions="sparkDeploysOptions"
                  :chartSeries="sparkDeploysSeries"
                  bgColor="rgba(0,44,27,0.7)"
                  textColor="#EE9AE5"
                  iconName="rocket-outline"
                  padding="20px"
                  iconSize="1.2rem"
                  titleFontSize="0.7rem"
                  valueFontSize="1.8rem"
                  detailsGap="4px"
                  iconTitleGap="3px"
                />
              </div>
            </div>

            <!-- Gráfico de CPU usage (cambiado de posición) -->
            <div class="cpu-gauge-container">
              <CPUUsageGauge />
            </div>
          </div>

          <!-- Panel derecho: Grid de gráficos 2x2 -->
          <div class="right-panel">
            <div class="chart-card errors-chart">
              <APIErrorsScatter />
            </div>
            <!-- Gráfico de latencia en tiempo real (cambiado de posición) -->
            <div class="chart-card latency-chart">
              <RealTimeLatency @update-latency="updateCurrentLatency" />
            </div>
            <div class="chart-card spend-chart">
              <UptimeMixed />
            </div>
            <div class="chart-card deploys-chart">
              <DeploysColumn />
            </div>
          </div>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar
} from '@ionic/vue'
import { ref, onMounted, onBeforeUnmount } from 'vue'

import APIErrorsScatter from '@/components/APIErrorsScatter.vue'
import UptimeMixed from '@/components/UptimeMixed.vue'
import CPUUsageGauge from '@/components/CPUUsageGauge.vue'
import DeploysColumn from '@/components/DeploysColumn.vue'
import RealTimeLatency from '@/components/RealTimeLatency.vue'
import SparkLine from '@/components/SparkLine.vue'

// Estado Latencia
const currentLatency = ref(190)

// Sparkline Latencia
const sparkLatencyOptions = ref({
  chart: { id: 'lat', type: 'area', sparkline: { enabled: true } },
  stroke: { curve: 'smooth', width: 2 },
  colors: ['#7BD08D'],
  tooltip: { theme: 'dark', x: { show: false } }
})
const sparkLatencySeries = ref([{ data: [200, 180, 195, 190, 185, 192, 190] }])

// Sparkline Uptime
const sparkUptimeOptions = ref({
  chart: { id: 'up', type: 'area', sparkline: { enabled: true } },
  stroke: { curve: 'smooth', width: 2 },
  colors: ['#A9DBB5'],
  tooltip: { theme: 'dark', x: { show: false } }
})
const sparkUptimeSeries = ref([{ data: [99.8, 99.9, 100, 99.9, 99.95, 99.9, 99.9] }])

// Sparkline Errores
const sparkErrorsOptions = ref({
  chart: { id: 'err', type: 'area', sparkline: { enabled: true } },
  stroke: { curve: 'smooth', width: 2 },
  colors: ['#EE9AE5'],
  tooltip: { theme: 'dark', x: { show: false } }
})
const sparkErrorsSeries = ref([{ data: [5, 3, 4, 2, 3, 1, 3] }])

// Sparkline Deploys
const sparkDeploysOptions = ref({
  chart: { id: 'dep', type: 'area', sparkline: { enabled: true } },
  stroke: { curve: 'smooth', width: 2 },
  colors: ['#EE9AE5'],
  tooltip: { theme: 'dark', x: { show: false } }
})
const sparkDeploysSeries = ref([{ data: [8, 9, 10, 11, 10, 12, 10] }])

// Actualizar Latencia
function updateCurrentLatency(latency: number) {
  currentLatency.value = latency
  sparkLatencySeries.value = [{ data: [...sparkLatencySeries.value[0].data.slice(1), latency] }]
}

// Ajuste de altura
let resizeObserver = null;

onMounted(() => {
  const adjustHeight = () => {
    // En dispositivos móviles, no forzamos una altura específica para permitir scroll
    if (window.innerWidth <= 768) {
      const container = document.querySelector('.dashboard-container');
      if (container) {
        container.style.height = 'auto';
      }
      return;
    }
    
    // En pantallas grandes, ajustamos la altura para evitar scroll
    const header = document.querySelector('ion-header');
    const headerHeight = header ? header.offsetHeight : 56;
    const windowHeight = window.innerHeight;
    const container = document.querySelector('.dashboard-container');
    
    if (container) {
      container.style.height = `${windowHeight - headerHeight}px`;
    }
  };
  
  // Ajuste inicial
  adjustHeight();
  
  // Usar ResizeObserver para detectar cambios en el tamaño
  resizeObserver = new ResizeObserver(adjustHeight);
  const container = document.querySelector('.dashboard-container');
  if (container) {
    resizeObserver.observe(container);
  }
  
  // Backup con event listener
  window.addEventListener('resize', adjustHeight);
});

onBeforeUnmount(() => {
  if (resizeObserver) {
    resizeObserver.disconnect();
  }
  window.removeEventListener('resize', () => {});
});
</script>

<style scoped>
.toolbar { 
  --background: #002C1B; 
  --color: white; 
}

.dashboard-content {
  --background: #001B11;
  --padding-top: 0; 
  --padding-bottom: 0;
  --padding-start: 0; 
  --padding-end: 0;
}

.dashboard-container {
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding: 16px;
  width: 100%;
}

/* Grid asimétrico */
.main-grid {
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 16px;
  width: 100%;
  height: 100%;
}

/* Izquierda */
.left-panel {
  display: flex; 
  flex-direction: column; 
  gap: 16px;
  height: 100%;
}

.kpi-column {
  display: flex; 
  flex-direction: column; 
  gap: 8px;
  height: 50%; /* Ocupar exactamente la mitad del panel izquierdo */
}

.kpi-card {
  background: transparent;
  border-radius: 10px;
  padding: 0;
  overflow: hidden;
  flex: 1; /* Distribuir el espacio equitativamente */
  min-height: 80px; /* Altura mínima para evitar que se achaten */
}

/* Contenedor para el gauge de CPU */
.cpu-gauge-container {
  flex: 1; 
  min-height: 250px; /* Altura mínima para evitar que se achate */
  background: rgba(0,44,27,0.5);
  border-radius: 10px;
  border: 1px solid rgba(169,219,181,0.1);
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  overflow: hidden;
}

/* Derecha */
.right-panel {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 16px;
  height: 100%;
}

.chart-card {
  background: rgba(0,44,27,0.5);
  border-radius: 10px;
  border: 1px solid rgba(169,219,181,0.1);
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  overflow: hidden;
  min-height: 300px; /* Altura mínima para evitar que se achaten */
}

/* Responsive */
@media (max-width: 992px) {
  .main-grid { 
    grid-template-columns: 1fr; 
    grid-template-rows: auto auto; 
  }
  
  .left-panel { 
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
    height: auto;
  }
  
  .kpi-column {
    height: auto;
    min-height: 350px; /* Altura mínima para evitar que se achaten */
  }
  
  .cpu-gauge-container { 
    height: auto;
    min-height: 350px; /* Altura mínima para evitar que se achaten */
  }
}

@media (max-width: 768px) {
  .dashboard-content {
    --overflow: auto; /* Permitir scroll en móviles */
  }
  
  .dashboard-container {
    height: auto;
    overflow: visible;
    padding: 12px;
  }
  
  .main-grid {
    display: flex;
    flex-direction: column;
    gap: 16px;
    height: auto;
  }
  
  .left-panel {
    display: flex;
    flex-direction: column;
    gap: 16px;
    height: auto;
  }
  
  .kpi-column {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, 1fr);
    gap: 12px;
    height: auto;
    min-height: 200px;
  }
  
  .kpi-card {
    min-height: 90px;
  }
  
  /* Aumentar significativamente la altura del gauge de CPU en móvil */
  .cpu-gauge-container {
    height: 400px;
    min-height: 400px;
  }
  
  .right-panel {
    display: flex;
    flex-direction: column;
    gap: 16px;
    height: auto;
  }
  
  /* Aumentar la altura de los gráficos para que no se corten */
  .chart-card {
    height: 450px;
    min-height: 450px;
    margin-bottom: 16px;
  }
  
  /* Ajustes específicos para cada tipo de gráfico */
  .errors-chart {
    height: 450px;
    min-height: 450px;
  }
  
  .latency-chart {
    height: 400px;
    min-height: 400px;
  }
  
  .spend-chart {
    height: 500px;
    min-height: 500px;
  }
  
  .deploys-chart {
    height: 450px;
    min-height: 450px;
  }
}

@media (max-width: 576px) {
  .kpi-column {
    grid-template-columns: 1fr;
    grid-template-rows: repeat(4, auto);
    min-height: 400px;
  }
  
  .kpi-card {
    min-height: 90px;
  }
  
  /* Aumentar aún más la altura del gauge de CPU en móviles pequeños */
  .cpu-gauge-container {
    height: 450px;
    min-height: 450px;
  }
  
  /* Aumentar aún más la altura de los gráficos en móviles pequeños */
  .chart-card {
    height: 500px;
    min-height: 500px;
    margin-bottom: 20px;
  }
  
  /* Ajustes específicos para cada tipo de gráfico en móviles pequeños */
  .errors-chart {
    height: 500px;
    min-height: 500px;
  }
  
  .latency-chart {
    height: 450px;
    min-height: 450px;
  }
  
  .spend-chart {
    height: 550px;
    min-height: 550px;
  }
  
  .deploys-chart {
    height: 500px;
    min-height: 500px;
  }
}
</style>