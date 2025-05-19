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
      <!-- KPIs fijos en versión móvil -->
      <div class="fixed-kpis">
        <div class="kpi-column">
          <!-- Latencia Actual -->
          <div class="kpi-card">
            <spark-line
              title="LATENCIA ACTUAL"
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
              title="UPTIME ÚLTIMA SEMANA"
              value="99.84%"
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
              title="ERRORS 500 ÚLTIMA SEMANA"
              value="4"
              :chartOptions="sparkErrorsOptions"
              :chartSeries="sparkErrorsSeries"
              bgColor="rgba(0,44,27,0.7)"
              textColor="#EE9AE5"
              iconName="alert-circle-outline"
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
              value="7"
              :chartOptions="sparkDeploysOptions"
              :chartSeries="sparkDeploysSeries"
              bgColor="rgba(0,44,27,0.7)"
              textColor="#EE9AE5"
              iconName="git-merge-outline"
              padding="20px"
              iconSize="1.2rem"
              titleFontSize="0.7rem"
              valueFontSize="1.8rem"
              detailsGap="4px"
              iconTitleGap="3px"
            />
          </div>
        </div>
      </div>

      <div class="dashboard-container">
        <div class="main-grid">
          <div class="left-panel">
            <div class="kpi-column desktop-only">
              <!-- Latencia Actual -->
              <div class="kpi-card">
                <spark-line
                  title="LATENCIA ACTUAL"
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
                  title="UPTIME ÚLTIMA SEMANA"
                  value="99.84%"
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
                  title="ERRORS 500 ÚLTIMA SEMANA"
                  value="4"
                  :chartOptions="sparkErrorsOptions"
                  :chartSeries="sparkErrorsSeries"
                  bgColor="rgba(0,44,27,0.7)"
                  textColor="#EE9AE5"
                  iconName="alert-circle-outline"
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
                  value="7"
                  :chartOptions="sparkDeploysOptions"
                  :chartSeries="sparkDeploysSeries"
                  bgColor="rgba(0,44,27,0.7)"
                  textColor="#EE9AE5"
                  iconName="git-merge-outline"
                  padding="20px"
                  iconSize="1.2rem"
                  titleFontSize="0.7rem"
                  valueFontSize="1.8rem"
                  detailsGap="4px"
                  iconTitleGap="3px"
                />
              </div>
            </div>

            <!-- Gráfico de CPU usage -->
            <div class="cpu-gauge-container">
              <CPUUsageGauge />
            </div>
          </div>

          <!-- Panel derecho: Grid de gráficos 2x2 -->
          <div class="right-panel">
            <div class="chart-card errors-chart">
              <APIErrorsScatter />
            </div>
            <!-- Gráfico de latencia en tiempo real -->
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
const sparkUptimeSeries = ref([{ data: [99.6, 99.8, 99.95, 99.88, 99.96, 99.97, 99.99] }])

// Sparkline Errores
const sparkErrorsOptions = ref({
  chart: { id: 'err', type: 'area', sparkline: { enabled: true } },
  stroke: { curve: 'smooth', width: 2 },
  colors: ['#EE9AE5'],
  tooltip: { theme: 'dark', x: { show: false } }
})
const sparkErrorsSeries = ref([{ data: [5, 9, 3, 6, 2, 1, 0] }])

// Sparkline Deploys
const sparkDeploysOptions = ref({
  chart: { id: 'dep', type: 'area', sparkline: { enabled: true } },
  stroke: { curve: 'smooth', width: 2 },
  colors: ['#EE9AE5'],
  tooltip: { theme: 'dark', x: { show: false } }
})
const sparkDeploysSeries = ref([{ data: [5, 7, 6, 9, 8, 10, 7] }])

// Actualizar Latencia
function updateCurrentLatency(latency: number) {
  currentLatency.value = latency
  sparkLatencySeries.value = [{ data: [...sparkLatencySeries.value[0].data.slice(1), latency] }]
}

let resizeObserver = null;

onMounted(() => {
  const adjustHeight = () => {
    if (window.innerWidth <= 768) {
      const container = document.querySelector('.dashboard-container');
      if (container) {
        container.style.height = 'auto';
      }
      return;
    }
    
    const header = document.querySelector('ion-header');
    const headerHeight = header ? header.offsetHeight : 56;
    const windowHeight = window.innerHeight;
    const container = document.querySelector('.dashboard-container');
    
    if (container) {
      container.style.height = `${windowHeight - headerHeight}px`;
    }
  };
  
  adjustHeight();
  
  resizeObserver = new ResizeObserver(adjustHeight);
  const container = document.querySelector('.dashboard-container');
  if (container) {
    resizeObserver.observe(container);
  }
  
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

.fixed-kpis {
  display: none; 
  position: sticky;
  top: 0;
  z-index: 10;
  background-color: #001B11;
  padding: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.dashboard-container {
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding: 16px;
  width: 100%;
}

.main-grid {
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 16px;
  width: 100%;
  height: 100%;
}

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
  height: 50%;
}

.kpi-card {
  background: transparent;
  border-radius: 10px;
  padding: 0;
  overflow: hidden;
  flex: 1; 
  min-height: 80px; 
}

.cpu-gauge-container {
  flex: 1; 
  min-height: 250px; 
  background: rgba(0,44,27,0.5);
  border-radius: 10px;
  border: 1px solid rgba(169,219,181,0.1);
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  overflow: hidden;
}

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
  min-height: 300px; 
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
    min-height: 350px; 
  }
  
  .cpu-gauge-container { 
    height: auto;
    min-height: 350px; 
  }
}

@media (max-width: 768px) {
  .fixed-kpis {
    display: block;
  }
  
  .desktop-only {
    display: none;
  }
  
  .dashboard-content {
    --overflow: auto;
  }
  
  .dashboard-container {
    height: auto;
    overflow: visible;
    padding: 12px;
    padding-top: 0;
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
  
  .fixed-kpis .kpi-column {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, 1fr);
    gap: 8px;
    height: auto;
    min-height: 180px;
  }
  
  .fixed-kpis .kpi-card {
    min-height: 80px;
  }
  
  .cpu-gauge-container {
    height: 300px;
    min-height: 300px;
    width: 100%;
  }
  
  .right-panel {
    display: flex;
    flex-direction: column;
    gap: 16px;
    height: auto;
  }
  
  .chart-card {
    height: 350px;
    min-height: 350px;
    margin-bottom: 16px;
  }
  
  .errors-chart {
    height: 350px;
    min-height: 350px;
  }
  
  .latency-chart {
    height: 350px;
    min-height: 350px;
  }
  
  .spend-chart {
    height: 350px;
    min-height: 350px;
  }
  
  .deploys-chart {
    height: 350px;
    min-height: 350px;
  }
}

@media (max-width: 576px) {
  .fixed-kpis .kpi-column {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: repeat(2, 1fr);
    min-height: 180px;
  }
  
  .fixed-kpis .kpi-card {
    min-height: 80px;
  }
  
  .cpu-gauge-container {
    height: 300px;
    min-height: 300px;
  }
  
  .chart-card {
    height: 350px;
    min-height: 350px;
    margin-bottom: 16px;
  }
  
  .errors-chart {
    height: 350px;
    min-height: 350px;
  }
  
  .latency-chart {
    height: 350px;
    min-height: 350px;
  }
  
  .spend-chart {
    height: 350px;
    min-height: 350px;
  }
  
  .deploys-chart {
    height: 350px;
    min-height: 350px;
  }
}
</style>