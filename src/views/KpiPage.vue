<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar class="toolbar">
        <ion-buttons slot="start">
          <ion-menu-button color="light" />
        </ion-buttons>
        <ion-title>🎯 Objetivos SMART</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="dashboard-content">
      <div class="kpi-container">
        <!-- Cabecera con explicación SMART -->
        <div class="smart-header">
          <h1>Objetivos SMART</h1>
          <p class="smart-description">
            Nuestros KPIs siguen la metodología SMART para garantizar objetivos claros y alcanzables:
          </p>
          <div class="smart-badges">
            <div class="smart-badge">
              <div class="badge-letter">S</div>
              <div class="badge-text">Specific</div>
            </div>
            <div class="smart-badge">
              <div class="badge-letter">M</div>
              <div class="badge-text">Measurable</div>
            </div>
            <div class="smart-badge">
              <div class="badge-letter">A</div>
              <div class="badge-text">Achievable</div>
            </div>
            <div class="smart-badge">
              <div class="badge-letter">R</div>
              <div class="badge-text">Relevant</div>
            </div>
            <div class="smart-badge">
              <div class="badge-letter">T</div>
              <div class="badge-text">Time-bound</div>
            </div>
          </div>
        </div>

        <!-- Pestañas para cambiar entre KPIs de Negocio y Técnicos -->
        <div class="tabs-container">
          <div 
            class="tab" 
            :class="{ 'active': activeTab === 'business' }"
            @click="activeTab = 'business'"
          >
            🚀 KPIs de Negocio
          </div>
          <div 
            class="tab" 
            :class="{ 'active': activeTab === 'tech' }"
            @click="activeTab = 'tech'"
          >
            📈 KPIs Técnicos
          </div>
        </div>

        <!-- Tarjetas de KPIs -->
        <div class="kpi-cards">
          <div 
            v-for="item in activeTab === 'business' ? businessGoals : techGoals" 
            :key="item.id"
            class="kpi-card"
          >
            <div class="kpi-card-header" @click="toggleExpand(item)">
              <div class="kpi-title">
                <div class="kpi-number">{{ item.id }}</div>
                <h2>{{ item.title }}</h2>
              </div>
              <div class="kpi-expand-icon" :class="{ 'expanded': expandedItems.includes(item.id) }">
                <ion-icon :icon="expandedItems.includes(item.id) ? chevronUpOutline : chevronDownOutline"></ion-icon>
              </div>
            </div>
            
            <div class="kpi-card-content" v-if="expandedItems.includes(item.id)">
              <p class="kpi-description">{{ item.description }}</p>
              
              <div class="smart-details">
                <div 
                  v-for="(element, idx) in item.smart" 
                  :key="idx"
                  class="smart-item"
                >
                  <div class="smart-letter">{{ element.letter }}</div>
                  <div class="smart-content">{{ element.content }}</div>
                </div>
              </div>

              <div class="kpi-progress">
                <div class="progress-header">
                  <span>Progreso actual</span>
                  <span>{{ getRandomProgress(item.id) }}%</span>
                </div>
                <div class="progress-bar">
                  <div 
                    class="progress-fill" 
                    :style="{ width: getRandomProgress(item.id) + '%' }"
                  ></div>
                </div>
              </div>
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
  IonToolbar,
  IonIcon
} from '@ionic/vue';
import { ref } from 'vue';
import { chevronDownOutline, chevronUpOutline } from 'ionicons/icons';

interface SmartElement {
  letter: string;
  content: string;
}

interface SmartGoal {
  id: number;
  title: string;
  description: string;
  smart: SmartElement[];
}

// KPIs de Negocio (externos)
const businessGoals = ref<SmartGoal[]>([
  {
    id: 1,
    title: 'MAU (Monthly Active Users)',
    description:
      'Engagement promedio diario basado en usuarios mensuales. Ratio actual 27%, con objetivo al 35% desde enero hasta julio.',
    smart: [
      { letter: 'S', content: 'Incrementar ratio MAU del 27% al 35%.' },
      { letter: 'M', content: 'Cálculo: DAU medio diario ÷ MAU mensual.' },
      { letter: 'A', content: 'Impulsar campañas in-app y recordatorios diarios.' },
      { letter: 'R', content: 'Aumenta fidelidad del usuario.' },
      { letter: 'T', content: 'En los próximos 2 meses.' }
    ]
  },
  {
    id: 2,
    title: 'Jugadores Activos (DAU)',
    description:
      'Usuarios activos diarios, media actual entre 650 y 750. Objetivo: aumentar un 15% (≈1000 DAU).',
    smart: [
      { letter: 'S', content: 'Pasar de 700 DAU actuales a 1000 DAU.' },
      { letter: 'M', content: 'Media diaria de inicios de sesión.' },
      { letter: 'A', content: 'Implementar notificaciones personalizadas.' },
      { letter: 'R', content: 'Clave para crecimiento y retención.' },
      { letter: 'T', content: 'En 4 semanas.' }
    ]
  },
  {
    id: 3,
    title: 'Retención Semanal por Clan',
    description:
      'Comparativa de retención semanal entre Clan A, B, C, D y Otros. Los clanes más grandes presentan mayor retención.',
    smart: [
      { letter: 'S', content: 'Mejorar retención clan A a 7 días activos.' },
      { letter: 'M', content: 'Heatmap semanal de Días Activos.' },
      { letter: 'A', content: 'Incentivar con recompensas por clan.' },
      { letter: 'R', content: 'Fomenta competencia sana.' },
      { letter: 'T', content: 'Continuo cada semana.' }
    ]
  },
  {
    id: 4,
    title: 'Participación en Boss Semanal',
    description:
      'Porcentaje de miembros por clan que participan en el Boss semanal. Actualmente la mayoría de cada clan juega.',
    smart: [
      { letter: 'S', content: 'Mantener participación ≥ 85% por clan.' },
      { letter: 'M', content: 'Conteo de participaciones vs. miembros.' },
      { letter: 'A', content: 'Ofrecer loot exclusivo.' },
      { letter: 'R', content: 'Refuerza interacción comunitaria.' },
      { letter: 'T', content: 'En 4 semanas.' }
    ]
  },
  {
    id: 5,
    title: 'Ingresos Semanales',
    description:
      'Gasto medio semanal por usuario: 4–5€. Objetivo: duplicar gasto semanal (8–10€/usuario).',
    smart: [
      { letter: 'S', content: 'Incrementar gasto de 5€ a 10€ por usuario/semana.' },
      { letter: 'M', content: 'Promedio de ingresos in-app semanales.' },
      { letter: 'A', content: 'Ofertas flash y eventos de venta.' },
      { letter: 'R', content: 'Mejora monetización sostenible.' },
      { letter: 'T', content: 'En 6 semanas.' }
    ]
  }
]);

// KPIs Técnicos (internos)
const techGoals = ref<SmartGoal[]>([
  {
    id: 1,
    title: 'Latencia Media API',
    description:
      'Reducir variabilidad de 100–250 ms a 80–150 ms para endpoints críticos.',
    smart: [
      { letter: 'S', content: 'Estabilizar latencia entre 80 y 150 ms.' },
      { letter: 'M', content: 'Media diaria con APM.' },
      { letter: 'A', content: 'Optimizar consultas y cachés.' },
      { letter: 'R', content: 'Mejora experiencia usuario.' },
      { letter: 'T', content: 'En 30 días.' }
    ]
  },
  {
    id: 2,
    title: 'Uptime de Servidores',
    description:
      'Mantener disponibilidad semanal en 99.99% (actual 99.84%).',
    smart: [
      { letter: 'S', content: 'Lograr uptime ≥ 99.99%.' },
      { letter: 'M', content: 'Monitorizado semanalmente.' },
      { letter: 'A', content: 'Auto-scaling y redundancia.' },
      { letter: 'R', content: 'Garantiza servicio continuo.' },
      { letter: 'T', content: 'Continuo.' }
    ]
  },
  {
    id: 3,
    title: 'Errores 500 Diarios',
    description:
      'Reducir promedio semanal de 7 errores a 0–2.',
    smart: [
      { letter: 'S', content: 'Bajar errores semanales a ≤ 2.' },
      { letter: 'M', content: 'Conteo en logs semanal.' },
      { letter: 'A', content: 'Mejorar validaciones y capturas.' },
      { letter: 'R', content: 'Incrementa fiabilidad.' },
      { letter: 'T', content: 'En 60 días.' }
    ]
  },
  {
    id: 4,
    title: 'Uso CPU Promedio',
    description:
      'Reducir rango de uso de CPU de 30–70% a 20–60%.',
    smart: [
      { letter: 'S', content: 'Mantener CPU entre 20% y 60%.' },
      { letter: 'M', content: 'Registro horario.' },
      { letter: 'A', content: 'Ajuste de JVM y réplicas.' },
      { letter: 'R', content: 'Evita saturaciones.' },
      { letter: 'T', content: 'Revisión continua.' }
    ]
  },
  {
    id: 5,
    title: 'Deploys Exitosos Mensuales',
    description:
      'Incrementar lanzamientos mensuales de 7 a 10–12.',
    smart: [
      { letter: 'S', content: 'Pasar de 7 a 12 deploys mensuales.' },
      { letter: 'M', content: 'Conteo en CI/CD.' },
      { letter: 'A', content: 'Automatizar pipelines.' },
      { letter: 'R', content: 'Mejora ciclo de entrega.' },
      { letter: 'T', content: 'En próximos 3 meses.' }
    ]
  }
]);

const activeTab = ref('business');
const expandedItems = ref<number[]>([]);
const toggleExpand = (item: SmartGoal) => {
  const idx = expandedItems.value.indexOf(item.id);
  if (idx > -1) expandedItems.value.splice(idx, 1);
  else expandedItems.value.push(item.id);
};

const progressMap = new Map<number, number>();
const getRandomProgress = (id: number) => {
  if (!progressMap.has(id)) {
    progressMap.set(id, Math.floor(Math.random() * 70) + 25);
  }
  return progressMap.get(id);
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

.kpi-container {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

/* Cabecera SMART */
.smart-header {
  margin-bottom: 24px;
  background: rgba(0, 44, 27, 0.7);
  border-radius: 12px;
  padding: 20px;
  border: 1px solid rgba(169, 219, 181, 0.2);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.smart-header h1 {
  color: #A9DBB5;
  font-size: 24px;
  margin: 0 0 12px 0;
}

.smart-description {
  color: #A9DBB5;
  margin-bottom: 16px;
  font-size: 14px;
  line-height: 1.5;
}

.smart-badges {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 16px;
}

.smart-badge {
  display: flex;
  align-items: center;
  background: rgba(123, 208, 141, 0.1);
  border-radius: 8px;
  padding: 8px 12px;
  border: 1px solid rgba(123, 208, 141, 0.3);
}

.badge-letter {
  font-weight: bold;
  font-size: 18px;
  color: #7BD08D;
  margin-right: 8px;
}

.badge-text {
  color: #A9DBB5;
  font-size: 14px;
}

/* Pestañas */
.tabs-container {
  display: flex;
  margin-bottom: 20px;
  background: rgba(0, 44, 27, 0.5);
  border-radius: 8px;
  padding: 4px;
}

.tab {
  flex: 1;
  text-align: center;
  padding: 12px;
  color: #A9DBB5;
  cursor: pointer;
  border-radius: 6px;
  transition: all 0.3s ease;
}

.tab.active {
  background: rgba(123, 208, 141, 0.2);
  color: #7BD08D;
  font-weight: 600;
}

/* Tarjetas de KPIs */
.kpi-cards {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.kpi-card {
  background: rgba(0, 44, 27, 0.5);
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid rgba(169, 219, 181, 0.1);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.kpi-card-header {
  padding: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.kpi-card-header:hover {
  background: rgba(123, 208, 141, 0.1);
}

.kpi-title {
  display: flex;
  align-items: center;
  gap: 12px;
}

.kpi-number {
  background: rgba(123, 208, 141, 0.2);
  color: #7BD08D;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
}

.kpi-title h2 {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: #A9DBB5;
}

.kpi-expand-icon {
  color: #A9DBB5;
  transition: transform 0.3s ease;
}

.kpi-expand-icon.expanded {
  transform: rotate(180deg);
}

.kpi-card-content {
  padding: 0 16px 16px;
  border-top: 1px solid rgba(169, 219, 181, 0.1);
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.kpi-description {
  color: #A9DBB5;
  font-size: 14px;
  line-height: 1.5;
  margin-bottom: 16px;
}

/* Detalles SMART */
.smart-details {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 20px;
}

.smart-item {
  display: flex;
  gap: 12px;
  padding: 8px;
  background: rgba(0, 44, 27, 0.3);
  border-radius: 6px;
}

.smart-letter {
  background: rgba(123, 208, 141, 0.2);
  color: #7BD08D;
  width: 24px;
  height: 24px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  flex-shrink: 0;
}

.smart-content {
  color: #A9DBB5;
  font-size: 14px;
  line-height: 1.5;
}

/* Barra de progreso */
.kpi-progress {
  margin-top: 16px;
}

.progress-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  color: #A9DBB5;
  font-size: 14px;
}

.progress-bar {
  height: 8px;
  background: rgba(169, 219, 181, 0.1);
  border-radius: 4px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #5AB06C, #7BD08D);
  border-radius: 4px;
  transition: width 0.5s ease;
}

/* Responsive */
@media (max-width: 768px) {
  .smart-badges {
    flex-direction: column;
    gap: 8px;
  }
  
  .smart-badge {
    width: 100%;
  }
}
</style>