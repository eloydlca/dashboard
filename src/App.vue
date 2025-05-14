<template>
  <ion-app>
    <ion-split-pane content-id="main-content">
      <ion-menu content-id="main-content" type="overlay" class="adventask-menu">
        <ion-content>
          <div class="menu-header">
            <div class="logo-container">
              <div class="logo">A</div>
              <div class="app-info">
                <ion-list-header>Adventask</ion-list-header>
                <ion-note>Panel de Control</ion-note>
              </div>
            </div>
          </div>

          <ion-list id="inbox-list">
            <ion-menu-toggle :auto-hide="false" v-for="(p, i) in appPages" :key="i">
              <ion-item @click="selectedIndex = i" router-direction="root" :router-link="p.url" lines="none" :detail="false" class="hydrated" :class="{ selected: selectedIndex === i }">
                <ion-icon aria-hidden="true" slot="start" :ios="p.iosIcon" :md="p.mdIcon"></ion-icon>
                <ion-label>{{ p.title }}</ion-label>
              </ion-item>
            </ion-menu-toggle>
          </ion-list>

          <div class="menu-footer">
            <div class="version">v1.2.0</div>
            <div class="user-info">
              <div class="user-avatar">ED</div>
              <div class="user-name">eloydlca</div>
            </div>
          </div>
        </ion-content>
      </ion-menu>
      <ion-router-outlet id="main-content"></ion-router-outlet>
    </ion-split-pane>
  </ion-app>
</template>

<script setup lang="ts">
import { IonApp, IonContent, IonIcon, IonItem, IonLabel, IonList, IonListHeader, IonMenu, IonMenuToggle, IonNote, IonRouterOutlet, IonSplitPane } from '@ionic/vue';
import { rocketOutline, rocketSharp, pulseOutline, pulseSharp, speedometerOutline, speedometerSharp } from 'ionicons/icons';
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';

const selectedIndex = ref(0);
const appPages = [
  {
    title: 'Negocio',
    url: '/negocio',
    iosIcon: rocketOutline,
    mdIcon: rocketSharp,
  },
  {
    title: 'Técnico',
    url: '/tecnico',
    iosIcon: pulseOutline,
    mdIcon: pulseSharp,
  },
  {
    title: 'KPIs',
    url: '/kpis',
    iosIcon: speedometerOutline,
    mdIcon: speedometerSharp,
  },
];

const route = useRoute();

// 🔄 Función para actualizar el `selectedIndex` según la URL actual
const updateSelectedIndex = () => {
  const currentPath = route.path;
  const index = appPages.findIndex(page => page.url === currentPath);
  selectedIndex.value = index !== -1 ? index : 0; // Default to 0 if not found
};

// Ejecutar cuando la app carga
onMounted(updateSelectedIndex);

// Ejecutar cada vez que cambia la ruta
watch(route, updateSelectedIndex);
</script>

<style scoped>
ion-split-pane {
  --side-width: 280px;
  --side-max-width: 280px;
}

/* Estilo general del menú */
.adventask-menu {
  --background: #001C16;
  --ion-background-color: #001C16;
}

.menu-header {
  padding: 20px 16px;
  border-bottom: 1px solid rgba(169, 219, 181, 0.1);
}

.logo-container {
  display: flex;
  align-items: center;
  gap: 12px;
}

.logo {
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #7BD08D, #5AB06C);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: bold;
  color: #001C16;
}

.app-info {
  display: flex;
  flex-direction: column;
}

/* Estilos para los elementos de la lista */
ion-list {
  background: transparent;
  padding: 16px 0;
}

ion-list-header {
  color: #A9DBB5 !important;
  font-size: 20px !important;
  font-weight: 600 !important;
  padding: 0 !important;
  min-height: 24px !important;
}

ion-note {
  color: rgba(169, 219, 181, 0.7) !important;
  font-size: 14px !important;
  margin-bottom: 0 !important;
}

ion-item {
  --background: transparent;
  --color: #A9DBB5;
  --border-radius: 8px;
  margin-bottom: 4px;
}

ion-item.selected {
  --background: rgba(123, 208, 141, 0.15);
  --color: #7BD08D;
  font-weight: 600;
}

ion-item ion-icon {
  color: #A9DBB5;
}

ion-item.selected ion-icon {
  color: #7BD08D;
}

/* Footer del menú */
.menu-footer {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 16px;
  border-top: 1px solid rgba(169, 219, 181, 0.1);
}

.version {
  font-size: 12px;
  color: rgba(169, 219, 181, 0.5);
  margin-bottom: 12px;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 10px;
}

.user-avatar {
  width: 32px;
  height: 32px;
  background: linear-gradient(135deg, #5AB06C, #7BD08D);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 500;
  color: #001C16;
}

.user-name {
  font-size: 14px;
  color: #A9DBB5;
}
</style>