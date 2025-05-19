<!-- pages/NegocioPage.vue -->

<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar class="toolbar">
        <ion-buttons slot="start">
          <ion-menu-button color="light" />
        </ion-buttons>
        <ion-title>🚀 Dashboard de Negocio</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="dashboard-content">
      <div class="dashboard-container">
        <!-- Fila superior: KPIs -->
        <div class="kpi-row">
          <!-- Jugadores Activos -->
          <div class="kpi-card">
            <spark-line
              title="JUGADORES ACTIVOS"
              :value="currentPlayers.toString()"
              :chartOptions="sparkRealTimeOptions"
              :chartSeries="sparkRealTimeSeries"
              bgColor="rgba(0,44,27,0.7)"
              textColor="#7BD08D"
              iconName="people-outline"
              padding="12px"
              iconSize="1.5rem"
              titleFontSize="0.7rem"
              valueFontSize="2rem"
              detailsGap="4px"
              iconTitleGap="4px"
            >
              <div class="live-indicator">
                <span class="pulse-dot"></span>
                <span class="live-text">En vivo</span>
              </div>
            </spark-line>
          </div>

          <!-- Ingresos Último Mes -->
          <div class="kpi-card">
            <spark-line
              title="INGRESOS ÚLTIMO MES"
              value="16.4K€"
              :chartOptions="sparkIncomeOptions"
              :chartSeries="sparkIncomeSeries"
              bgColor="rgba(0,44,27,0.7)"
              textColor="#A9DBB5"
              iconName="cash-outline"
              padding="12px"
              iconSize="1.5rem"
              titleFontSize="0.7rem"
              valueFontSize="2rem"
              detailsGap="4px"
              iconTitleGap="4px"
            />
          </div>

          <!-- MAU Promedio -->
          <div class="kpi-card">
            <spark-line
              title="MAU"
              value="27%"
              :chartOptions="sparkDauMauOptions"
              :chartSeries="sparkDauMauSeries"
              bgColor="rgba(0,44,27,0.7)"
              textColor="#A9DBB5"
              iconName="eye-outline"
              padding="12px"
              iconSize="1.5rem"
              titleFontSize="0.7rem"
              valueFontSize="2rem"
              detailsGap="4px"
              iconTitleGap="4px"
            />
          </div>

          <!-- Participantes Boss -->
          <div class="kpi-card">
            <spark-line
              title="BOSS PART. ÚLTIMA SEMANA"
              value="787"
              :chartOptions="sparkBossOptions"
              :chartSeries="sparkBossSeries"
              bgColor="rgba(0,44,27,0.7)"
              textColor="#A9DBB5"
              iconName="people-outline"
              padding="12px"
              iconSize="1.5rem"
              titleFontSize="0.7rem"
              valueFontSize="2rem"
              detailsGap="4px"
              iconTitleGap="4px"
            />
          </div>
        </div>

        <!-- Fila de gráficos principales -->
        <div class="charts-grid">
          <div class="chart-card">
            <MAUBubble />
          </div>
          <div class="chart-card">
            <WeeklyRevenue />
          </div>
          <div class="chart-card">
            <BossParticipationDonut />
          </div>
          <div class="chart-card">
            <WeeklyRetentionHeatmap />
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

import MAUBubble from '@/components/MAUBubble.vue'
import BossParticipationDonut from '@/components/BossParticipationDonut.vue'
import WeeklyRevenue from '@/components/WeeklyRevenue.vue'
import WeeklyRetentionHeatmap from '@/components/WeeklyRetentionHeatmap.vue'
import SparkLine from '@/components/SparkLine.vue'

// KPI Jugadores activos
const currentPlayers = ref(650)

// Sparkline para datos en tiempo real
const sparkRealTimeOptions = ref({
  chart: { id: 'rt', type: 'area', sparkline: { enabled: true }, dropShadow: { enabled: true, top: 1, left: 1, blur: 2, opacity: 0.5 } },
  stroke: { curve: 'smooth', width: 3 },
  colors: ['#7BD08D'],
  fill: {
    type: 'gradient',
    gradient: {
      shadeIntensity: 1,
      opacityFrom: 0.7,
      opacityTo: 0.2,
      stops: [0, 90, 100],
      colorStops: [
        {
          offset: 0,
          color: '#7BD08D',
          opacity: 0.4
        },
        {
          offset: 100,
          color: '#001B11',
          opacity: 0
        }
      ]
    }
  },
  tooltip: { theme: 'dark', x: { show: false }, y: { title: { formatter: () => '' } } }
})
const sparkRealTimeSeries = ref([{ data: [500, 520, 480, 530, currentPlayers.value] }])

// Sparkline para Ingresos Último Mes
const sparkIncomeOptions = ref({
  chart: { id: 'inc', type: 'area', sparkline: { enabled: true }, dropShadow: { enabled: true, top: 1, left: 1, blur: 2, opacity: 0.5 } },
  stroke: { curve: 'smooth', width: 3 },
  colors: ['#A9DBB5'],
  tooltip: { theme: 'dark', x: { show: false }, y: { title: { formatter: () => '' } } }
})
const sparkIncomeSeries = ref([{ data: [12500, 13000, 12000, 15750, 15000, 16250, 16400] }])

// Sparkline para MAU
const sparkDauMauOptions = ref({
  chart: { id: 'dau', type: 'area', sparkline: { enabled: true }, dropShadow: { enabled: true, top: 1, left: 1, blur: 2, opacity: 0.5 } },
  stroke: { curve: 'smooth', width: 3 },
  colors: ['#EE9AE5'],
  tooltip: { theme: 'dark', x: { show: false }, y: { title: { formatter: () => '' } } }
})
const sparkDauMauSeries = ref([{ data: [25, 27, 26, 28, 27, 29, 27] }])

// Sparkline para Participantes Boss
const sparkBossOptions = ref({
  chart: { id: 'boss', type: 'area', sparkline: { enabled: true }, dropShadow: { enabled: true, top: 1, left: 1, blur: 2, opacity: 0.5 } },
  stroke: { curve: 'smooth', width: 3 },
  colors: ['#F31B4A'],
  tooltip: { theme: 'dark', x: { show: false }, y: { title: { formatter: () => '' } } }
})
const sparkBossSeries = ref([{ data: [700, 750, 800, 825, 795, 850, 787] }])

// Implementación de la funcionalidad de tiempo real directamente en este componente
let intervalId: number | undefined

onMounted(() => {
  intervalId = window.setInterval(() => {
    const next = Math.floor(Math.random() * 100) + 650 
    currentPlayers.value = next
    
    // Actualizar la serie de datos para el sparkline
    sparkRealTimeSeries.value = [{ 
      data: [...sparkRealTimeSeries.value[0].data.slice(1), next] 
    }]
  }, 3500)
  
  adjustHeight();
  window.addEventListener('resize', adjustHeight);
})

onBeforeUnmount(() => {
  if (intervalId !== undefined) {
    clearInterval(intervalId)
  }
  window.removeEventListener('resize', adjustHeight);
})

function adjustHeight() {
  const windowHeight = window.innerHeight;
  const header = document.querySelector('ion-header');
  const headerHeight = header ? header.clientHeight : 56;
  
  const availableHeight = windowHeight - headerHeight - 8; 
  
  const container = document.querySelector('.dashboard-container');
  const kpiRow = document.querySelector('.kpi-row');
  const chartsGrid = document.querySelector('.charts-grid');
  
  if (container && kpiRow && chartsGrid) {
    const kpiHeight = kpiRow.clientHeight;
    const containerPadding = 24; 
    
    const chartsHeight = availableHeight - kpiHeight - containerPadding;
    
    if (chartsHeight > 300) {
      (chartsGrid as HTMLElement).style.height = `${chartsHeight}px`;
    }
  }
}
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
  height: 100%;
  padding: 12px;
  gap: 12px;
  overflow: hidden;
}

.kpi-row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
}

.kpi-card {
  background: transparent;
  border-radius: 12px;
  padding: 0;
  overflow: hidden;
  height: 80px;
  position: relative;
}

.charts-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 12px;
  flex: 1;
  min-height: 0;
}

.chart-card {
  background: rgba(0, 44, 27, 0.5);
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid rgba(169, 219, 181, 0.1);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  min-height: 0;
  height: 100%;
}

.live-indicator {
  position: absolute;
  top: 8px;
  right: 8px;
  display: flex;
  align-items: center;
  background: rgba(123, 208, 141, 0.2);
  border-radius: 16px;
  padding: 3px 6px 3px 13px;
}

.pulse-dot {
  position: absolute;
  width: 8px;
  height: 8px;
  background-color: #7BD08D;
  border-radius: 50%;
  left: 4px;
  top: 50%;
  transform: translateY(-50%);
  animation: pulse 2s infinite;
}

.live-text {
  color: #7BD08D;
  font-size: 10px;
  font-weight: 600;
}

@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(123, 208, 141, 0.7);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(123, 208, 141, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(123, 208, 141, 0);
  }
}

/* Responsive */
@media (max-width: 1200px) {
  .kpi-row {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }
  
  .charts-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .kpi-row {
    grid-template-columns: repeat(2, 1fr);
  }

  .charts-grid {
    grid-template-columns: 1fr;
    height: auto;
    overflow: auto;
  }
  
  .chart-card {
    height: 300px;
  }
  
  .dashboard-container {
    overflow: auto;
  }
}

@media (max-width: 480px) {
  .kpi-row {
    grid-template-columns: 1fr;
  }
  
  .dashboard-container {
    padding: 8px;
    gap: 8px;
  }
}
</style>