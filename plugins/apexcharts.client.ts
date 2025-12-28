// plugins/apexcharts.client.ts
import VueApexCharts from 'vue3-apexcharts';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('VueApexCharts', VueApexCharts);
});
