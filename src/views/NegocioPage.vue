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
          <div class="kpi-card">
            <div class="kpi-icon">👥</div>
            <div class="kpi-content">
              <div class="kpi-value">{{ currentPlayers }}</div>
              <div class="kpi-label">Jugadores Activos</div>
            </div>
          </div>
          <div class="kpi-card">
            <div class="kpi-icon">💰</div>
            <div class="kpi-content">
              <div class="kpi-value">62.5K€</div>
              <div class="kpi-label">Ingresos Último Mes</div>
            </div>
          </div>
          <div class="kpi-card">
            <div class="kpi-icon">📈</div>
            <div class="kpi-content">
              <div class="kpi-value">27%</div>
              <div class="kpi-label">DAU/MAU Promedio</div>
            </div>
          </div>
          <div class="kpi-card">
            <div class="kpi-icon">🏆</div>
            <div class="kpi-content">
              <div class="kpi-value">3,147</div>
              <div class="kpi-label">Participantes Boss</div>
            </div>
          </div>
        </div>

        <!-- Fila de gráficos principales -->
        <div class="charts-grid">
          <div class="chart-card">
            <DAULine />
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
  IonButtons, IonContent, IonHeader, IonMenuButton, IonPage,
  IonTitle, IonToolbar
} from '@ionic/vue';
import { ref } from 'vue';

import DAULine from '@/components/DAULine.vue';
import BossParticipationDonut from '@/components/BossParticipationDonut.vue';
import WeeklyRevenue from '@/components/WeeklyRevenue.vue';
import WeeklyRetentionHeatmap from '@/components/WeeklyRetentionHeatmap.vue';
import RealTimePlayers from '@/components/RealTimePlayers.vue';

// Estado para el KPI de jugadores activos
const currentPlayers = ref(530);

// Función para actualizar el KPI de jugadores activos
const updateCurrentPlayers = (players: number) => {
  currentPlayers.value = players;
};
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
  background: rgba(0, 44, 27, 0.7);
  border-radius: 12px;
  padding: 16px;
  display: flex;
  align-items: center;
  border: 1px solid rgba(169, 219, 181, 0.2);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.kpi-icon {
  font-size: 24px;
  margin-right: 12px;
}

.kpi-content {
  display: flex;
  flex-direction: column;
}

.kpi-value {
  font-size: 24px;
  font-weight: bold;
  color: #7BD08D;
}

.kpi-label {
  font-size: 12px;
  color: #A9DBB5;
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
</style>