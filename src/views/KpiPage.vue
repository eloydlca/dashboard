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
    title: 'DAU / MAU Ratio',
    description:
      'Aumentar la ratio de usuarios activos diarios vs. mensuales para mejorar el engagement.',
    smart: [
      { letter: 'S', content: 'Incrementar la ratio DAU/MAU del 20% actual al 35%.' },
      { letter: 'M', content: 'Medido como DAU ÷ MAU mensual.' },
      { letter: 'A', content: 'Enviando notificaciones push y recompensas diarias.' },
      { letter: 'R', content: 'Favorece la retención y uso diario de Adventask.' },
      { letter: 'T', content: 'En los próximos 2 meses.' }
    ]
  },
  {
    id: 2,
    title: 'Jugadores Activos',
    description:
      'Incrementar el número de usuarios activos diarios en la aplicación para mejorar el engagement y retención.',
    smart: [
      { letter: 'S', content: 'Aumentar los DAU de 500 actuales a 800.' },
      { letter: 'M', content: 'Contabilizado por usuarios que inician sesión al menos una vez al día.' },
      { letter: 'A', content: 'Implementando notificaciones personalizadas y recompensas de login diario.' },
      { letter: 'R', content: 'Clave para el crecimiento de la comunidad y retención.' },
      { letter: 'T', content: 'En los próximos 4 semanas.' }
    ]
  },
  {
    id: 3,
    title: 'Retención semanal',
    description:
      'Mejorar la retención de usuarios una semana después de registrarse.',
    smart: [
      { letter: 'S', content: 'Subir la retención post-registro del 25% al 50%.' },
      { letter: 'M', content: 'Cohorte de registros vs. usuarios la semana siguiente.' },
      { letter: 'A', content: 'Implementando tutorial in-app y misiones de bienvenida.' },
      { letter: 'R', content: 'Disminuye el abandono temprano de la app.' },
      { letter: 'T', content: 'En las próximas 8 semanas.' }
    ]
  },
  {
    id: 4,
    title: 'Participación en el boss semanal',
    description:
      'Incrementar el porcentaje de jugadores que participan en la lucha de comunidad.',
    smart: [
      { letter: 'S', content: 'Pasar del 40% actual al 70% de participación.' },
      { letter: 'M', content: '% de MAU que juegan al boss semanal.' },
      { letter: 'A', content: 'Ofreciendo loot exclusivo y XP extra.' },
      { letter: 'R', content: 'Refuerza el aspecto social y cooperativo.' },
      { letter: 'T', content: 'En las próximas 4 semanas.' }
    ]
  },
  {
    id: 5,
    title: 'Ingresos semanales',
    description:
      'Mantener y analizar los ingresos totales semanales generados por la tienda.',
    smart: [
      { letter: 'S', content: 'Alcanzar 10 000 € de ingresos semanales.' },
      { letter: 'M', content: 'Sumatorio de ventas in-app cada semana.' },
      { letter: 'A', content: 'Lanzando eventos temporales de oferta.' },
      { letter: 'R', content: 'Garantiza viabilidad y reinversión.' },
      { letter: 'T', content: 'Antes de finalizar el próximo mes.' }
    ]
  }
]);

// KPIs Técnicos (internos)
const techGoals = ref<SmartGoal[]>([
  {
    id: 1,
    title: 'Latencia media API',
    description:
      'Reducir la latencia de respuesta de los endpoints de tareas y perfil.',
    smart: [
      { letter: 'S', content: 'Bajar latencia media de 250 ms a 150 ms.' },
      { letter: 'M', content: 'Medida diaria con herramientas APM.' },
      { letter: 'A', content: 'Optimizando consultas y cachés.' },
      { letter: 'R', content: 'Mejora UX y disminuye time-outs.' },
      { letter: 'T', content: 'En los próximos 30 días.' }
    ]
  },
  {
    id: 2,
    title: 'Uptime de servidores',
    description:
      'Garantizar alta disponibilidad con SLA de hasta 99,9%.',
    smart: [
      { letter: 'S', content: 'Alcanzar uptime ≥ 99,9%.' },
      { letter: 'M', content: 'Monitorizado con health-checks externos.' },
      { letter: 'A', content: 'Implementando auto-scaling y redundancia.' },
      { letter: 'R', content: 'Evita interrupciones en eventos semanales.' },
      { letter: 'T', content: 'En el próximo trimestre.' }
    ]
  },
  {
    id: 3,
    title: 'Errores 500 diarios',
    description:
      'Reducir los errores internos de servidor en los logs.',
    smart: [
      { letter: 'S', content: 'Bajar errores 500 de 20 a < 5 diarios.' },
      { letter: 'M', content: 'Recuento automático en el sistema de logs.' },
      { letter: 'A', content: 'Mejorando validaciones y capturas de excepción.' },
      { letter: 'R', content: 'Incrementa fiabilidad del backend.' },
      { letter: 'T', content: 'En los próximos 60 días.' }
    ]
  },
  {
    id: 4,
    title: 'Uso de CPU promedio',
    description:
      'Mantener nivel óptimo de uso de CPU en horas punta.',
    smart: [
      { letter: 'S', content: 'Mantener CPU < 60% en peak.' },
      { letter: 'M', content: 'Media horaria registrada por servidor.' },
      { letter: 'A', content: 'Ajustar JVM y réplicas.' },
      { letter: 'R', content: 'Evita cuellos de botella.' },
      { letter: 'T', content: 'Revisión semanal continua.' }
    ]
  },
  {
    id: 5,
    title: 'Deploys exitosos mensuales',
    description:
      'Asegurar frecuencia y calidad de despliegues a producción.',
    smart: [
      { letter: 'S', content: 'Al menos 4 despliegues sin rollback al mes.' },
      { letter: 'M', content: 'Conteo en CI/CD pipelines.' },
      { letter: 'A', content: 'Automatizando tests y validaciones.' },
      { letter: 'R', content: 'Agiliza la entrega de features.' },
      { letter: 'T', content: 'Cada mes, sin excepciones.' }
    ]
  }
]);

// Estado para las pestañas y elementos expandidos
const activeTab = ref('business');
const expandedItems = ref<number[]>([]);

// Función para alternar la expansión de un elemento
const toggleExpand = (item: SmartGoal) => {
  if (expandedItems.value.includes(item.id)) {
    expandedItems.value = expandedItems.value.filter(id => id !== item.id);
  } else {
    expandedItems.value.push(item.id);
  }
};

// Función para generar un progreso aleatorio pero consistente para cada KPI
const progressMap = new Map();
const getRandomProgress = (id: number) => {
  if (!progressMap.has(id)) {
    // Generar un valor entre 25 y 95
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