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
          <!-- Panel izquierdo: KPIs y gráfico de latencia -->
          <div class="left-panel">
            <!-- KPIs en formato vertical -->
            <div class="kpi-column">
              <div class="kpi-card">
                <div class="kpi-icon">⏱️</div>
                <div class="kpi-content">
                  <div class="kpi-value">{{ currentLatency }}ms</div>
                  <div class="kpi-label">Latencia Actual</div>
                </div>
              </div>
              <div class="kpi-card">
                <div class="kpi-icon">🔄</div>
                <div class="kpi-content">
                  <div class="kpi-value">99.9%</div>
                  <div class="kpi-label">Uptime Servidores</div>
                </div>
              </div>
              <div class="kpi-card">
                <div class="kpi-icon">⚠️</div>
                <div class="kpi-content">
                  <div class="kpi-value">3</div>
                  <div class="kpi-label">Errores 500 Hoy</div>
                </div>
              </div>
              <div class="kpi-card">
                <div class="kpi-icon">🚀</div>
                <div class="kpi-content">
                  <div class="kpi-value">10</div>
                  <div class="kpi-label">Deploys Exitosos</div>
                </div>
              </div>
            </div>
            
            <!-- Gráfico de latencia en tiempo real -->
            <div class="latency-chart">
              <RealTimeLatency @update-latency="updateCurrentLatency" />
            </div>
          </div>
          
          <!-- Panel derecho: Grid de gráficos 2x2 -->
          <div class="right-panel">
            <div class="chart-card errors-chart">
              <APIErrorsBar />
            </div>
            <div class="chart-card cpu-chart">
              <CPUUsageArea />
            </div>
            <div class="chart-card spend-chart">
              <AvgSpendMixed />
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
import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/vue';
import { ref, onMounted } from 'vue';
import APIErrorsBar from '@/components/APIErrorsBar.vue';
import AvgSpendMixed from '@/components/AvgSpendMixed.vue';
import CPUUsageArea from '@/components/CPUUsageArea.vue';
import DeploysColumn from '@/components/DeploysColumn.vue';
import RealTimeLatency from '@/components/RealTimeLatency.vue';

const currentLatency = ref(190);

const updateCurrentLatency = (latency: number) => {
  currentLatency.value = latency;
};

// Calcular altura disponible al montar el componente
onMounted(() => {
  // Ajustar tamaño en caso necesario
  adjustDashboardSize();
  
  // Volver a ajustar si cambia el tamaño de la ventana
  window.addEventListener('resize', adjustDashboardSize);
});

// Función para ajustar el tamaño del dashboard
const adjustDashboardSize = () => {
  const header = document.querySelector('ion-header');
  const headerHeight = header ? header.clientHeight : 56; // Altura por defecto si no se encuentra
  
  const container = document.querySelector('.dashboard-container');
  if (container) {
    const viewportHeight = window.innerHeight;
    const availableHeight = viewportHeight - headerHeight;
    container.style.height = `${availableHeight}px`;
  }
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
  overflow: hidden;
}

.dashboard-container {
  box-sizing: border-box;
  padding: 10px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

/* Layout principal con grid asimétrico */
.main-grid {
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 10px;
  height: 100%;
  min-height: 0; /* Importante para que el grid respete la altura del contenedor */
}

/* Panel izquierdo con KPIs y gráfico de latencia */
.left-panel {
  display: flex;
  flex-direction: column;
  gap: 10px;
  height: 100%;
  min-height: 0; /* Importante para que flex respete la altura */
}

.kpi-column {
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 0 0 auto;
}

.kpi-card {
  background: rgba(0, 44, 27, 0.7);
  border-radius: 10px;
  padding: 8px 10px;
  display: flex;
  align-items: center;
  border: 1px solid rgba(169, 219, 181, 0.2);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.kpi-icon {
  font-size: 18px;
  margin-right: 10px;
}

.kpi-content {
  display: flex;
  flex-direction: column;
}

.kpi-value {
  font-size: 18px;
  font-weight: bold;
  color: #7BD08D;
  line-height: 1.2;
}

.kpi-label {
  font-size: 11px;
  color: #A9DBB5;
  line-height: 1.2;
}

.latency-chart {
  flex: 1;
  min-height: 0; /* Crucial para que el gráfico no desborde */
  background: rgba(0, 44, 27, 0.5);
  border-radius: 10px;
  border: 1px solid rgba(169, 219, 181, 0.1);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

/* Panel derecho con grid de gráficos 2x2 */
.right-panel {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 10px;
  height: 100%;
  min-height: 0; /* Importante para que el grid respete la altura */
}

.chart-card {
  background: rgba(0, 44, 27, 0.5);
  border-radius: 10px;
  border: 1px solid rgba(169, 219, 181, 0.1);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  min-height: 0; /* Crucial para que los gráficos no desborden */
}

/* Media queries para responsive */
@media (max-width: 1200px) {
  .main-grid {
    grid-template-columns: 240px 1fr;
  }
}

@media (max-width: 992px) {
  .main-grid {
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr;
  }
  
  .left-panel {
    flex-direction: row;
  }
  
  .kpi-column {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, 1fr);
    gap: 8px;
    flex: 1;
  }
  
  .latency-chart {
    flex: 2;
  }
}

@media (max-width: 768px) {
  .dashboard-container {
    height: auto;
    overflow: auto;
  }
  
  .main-grid {
    height: auto;
    grid-template-rows: auto auto;
  }
  
  .left-panel {
    flex-direction: column;
  }
  
  .kpi-column {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, auto);
  }
  
  .latency-chart {
    height: 300px;
  }
  
  .right-panel {
    grid-template-columns: 1fr;
    grid-template-rows: repeat(4, 300px);
  }
}
</style>