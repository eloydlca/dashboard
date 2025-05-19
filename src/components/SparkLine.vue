<template>
    <div
      class="box-sparkline"
      :style="{
        background: bgColor,
        color: textColor,
        padding: padding
      }"
    >
      <!-- Contenedor relativo para superponer -->
      <div class="sparkline-background">
        <vapexChart
          class="sparkline-chart"
          :height="chartHeight"
          :options="chartOptions"
          :series="chartSeries"
        />
      </div>
  
      <!-- Texto por encima -->
      <div class="details" :style="{ gap: detailsGap }">
        <div :style="{ gap: iconTitleGap }">
          <ion-icon
            :name="iconName"
            :style="{ fontSize: iconSize }"
          />
          <span :style="{ fontSize: titleFontSize }">{{ title }}</span>
        </div>
        <span :style="{ fontSize: valueFontSize }">{{ value }}</span>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { IonIcon } from '@ionic/vue';
  import { addIcons } from 'ionicons';
  import {
    navigateOutline,
    logoIonic,
    eyeOutline,
    peopleOutline,
    cashOutline
  } from 'ionicons/icons';
  import vapexChart from 'vue3-apexcharts';
  import { ref, watchEffect, onUnmounted, defineProps } from 'vue';
  
  // Registrar iconos
  addIcons({
    'logo-ionic': logoIonic,
    'navigate-outline': navigateOutline,
    'eye-outline': eyeOutline,
    'people-outline': peopleOutline,
    'cash-outline': cashOutline,
  });
  
  // Props
  const props = defineProps({
    title:         { type: String, default: 'Metrica' },
    value:         { type: String, default: '#Value' },
    chartOptions:  { type: Object, required: true },
    chartSeries:   { type: Array,  required: true },
    bgColor:       { type: String, default: 'transparent' },
    textColor:     { type: String, default: '#fff' },
    iconName:      { type: String, default: 'logo-ionic' },
  
    // Props para tamaños
    padding:           { type: String, default: '16px' },
    iconSize:          { type: String, default: '2rem' },
    titleFontSize:     { type: String, default: '0.8rem' },
    valueFontSize:     { type: String, default: '2.9rem' },
    detailsGap:        { type: String, default: '5px' },
    iconTitleGap:      { type: String, default: '4px' },
  });
  
  const chartHeight = ref('50%');
  const updateChartHeight = () => {
    const w = window.innerWidth;
    chartHeight.value =
      w < 576 ? '30%' :
      w < 768 ? '40%' :
      '50%';
  };
  watchEffect(() => {
    updateChartHeight();
    window.addEventListener('resize', updateChartHeight);
  });
  onUnmounted(() => {
    window.removeEventListener('resize', updateChartHeight);
  });
  </script>
  
  <style scoped>
  .box-sparkline {
    position: relative;           /* contenedor relativo */
    display: flex;
    flex-direction: column;
    width: 100%;
    border-radius: 5px;
    overflow: hidden;
  }
  
  /* Gráfico como fondo absoluto */
  .sparkline-background {
    position: absolute;
    top: 1; left: 0; right: 0; bottom: 0;
    z-index: 1;
    opacity: 0.2;                 /* ajusta opacidad para no tapar el texto */
  }
  .sparkline-chart {
    width: 100%;
    height: 100% !important;
    min-width: 50px;
  }
  
  /* Texto encima del gráfico */
  .details {
    position: relative;
    z-index: 2;
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    align-items: center;
  }
  </style>
  