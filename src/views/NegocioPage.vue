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
              title="JUGADORES"
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
            />
          </div>

          <!-- Ingresos Último Mes -->
          <div class="kpi-card">
            <spark-line
              title="INGRESOS"
              value="62.5K€"
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

          <!-- DAU/MAU Promedio -->
          <div class="kpi-card">
            <spark-line
              title="DAU/MAU"
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
              title="BOSS PART."
              value="3,147"
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
          <div class="chart-card"><DAULine /></div>
          <div class="chart-card"><WeeklyRevenue /></div>
          <div class="chart-card"><BossParticipationDonut /></div>
          <div class="chart-card"><WeeklyRetentionHeatmap /></div>
        </div>

        <!-- Gráfico de tiempo real en la parte inferior -->
        <div class="realtime-container">
          <RealTimePlayers @update-players="updateCurrentPlayers" />
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
import { ref } from 'vue'

import DAULine from '@/components/DAULine.vue'
import BossParticipationDonut from '@/components/BossParticipationDonut.vue'
import WeeklyRevenue from '@/components/WeeklyRevenue.vue'
import WeeklyRetentionHeatmap from '@/components/WeeklyRetentionHeatmap.vue'
import RealTimePlayers from '@/components/RealTimePlayers.vue'
import SparkLine from '@/components/SparkLine.vue'

// KPI Jugadores activos
const currentPlayers = ref(530)

// Sparkline para datos en tiempo real
const sparkRealTimeOptions = ref({
  chart: { id: 'rt', type: 'area', sparkline: { enabled: true }, dropShadow: { enabled: true, top: 1, left: 1, blur: 2, opacity: 0.5 } },
  stroke: { curve: 'smooth', width: 3 },
  colors: ['#7BD08D'],
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
const sparkIncomeSeries = ref([{ data: [50000, 52000, 48000, 63000, 60000, 65000, 62500] }])

// Sparkline para DAU/MAU
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
const sparkBossSeries = ref([{ data: [2800, 3000, 3200, 3300, 3147, 3400, 3300] }])

// Función para actualizar KPI de jugadores activos
function updateCurrentPlayers(players: number) {
  currentPlayers.value = players
  // sincronizar sparkline
  sparkRealTimeSeries.value = [{ data: [...sparkRealTimeSeries.value[0].data.slice(1), players] }]
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
  padding: 16px;
  gap: 16px;
  max-height: 100vh;
  overflow: hidden;
}

.kpi-row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}

.kpi-card {
  background: transparent;
  border-radius: 12px;
  padding: 0;
  overflow: hidden;
  height: 100px;
}

.charts-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 16px;
  flex: 1;
  min-height: 0;
}

.chart-card {
  background: rgba(0, 44, 27, 0.5);
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid rgba(169, 219, 181, 0.1);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.realtime-container {
  height: 300px;
  background: rgba(0, 44, 27, 0.5);
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid rgba(169, 219, 181, 0.1);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

/* Responsive */
@media (max-width: 768px) {
  .kpi-row {
    grid-template-columns: repeat(2, 1fr);
  }

  .charts-grid {
    grid-template-columns: 1fr;
    grid-template-rows: repeat(4, 300px);
  }

  .dashboard-container {
    height: auto;
    max-height: none;
    overflow: auto;
  }
}

.charts-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 16px;
  flex: 1;
  min-height: 500px; /* Altura mínima para evitar que los gráficos se achaten */
}

.chart-card {
  background: rgba(0, 44, 27, 0.5);
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid rgba(169, 219, 181, 0.1);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  min-height: 350px; /* Altura mínima para cada gráfico */
}

.realtime-container {
  height: 350px; /* Aumentado de 300px para dar más espacio */
  background: rgba(0, 44, 27, 0.5);
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid rgba(169, 219, 181, 0.1);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

/* Responsive */
@media (max-width: 768px) {
  .kpi-row {
    grid-template-columns: repeat(2, 1fr);
  }

  .charts-grid {
    grid-template-columns: 1fr;
    grid-template-rows: repeat(4, 350px); /* Altura fija para cada gráfico en móvil */
    min-height: auto;
  }

  .dashboard-container {
    height: auto;
    max-height: none;
    overflow: auto;
  }
}

@media (min-width: 1200px) {
  .charts-grid {
    min-height: 600px; /* Más altura en pantallas muy grandes */
  }
  
  .chart-card {
    min-height: 400px; /* Más altura en pantallas muy grandes */
  }
  
  .realtime-container {
    height: 400px; /* Más altura en pantallas muy grandes */
  }
}
</style>
