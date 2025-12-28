<template>
  <div>
    <div class="flex justify-between items-center gap-4 mb-6">
      <h1 class="text-2xl font-bold text-gray-800">Dashboard Overview</h1>
      <button
        class="px-5 py-2 bg-white text-sm font-medium text-gray-700 border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200"
      >
        Filter Date
      </button>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <SummaryBox
        v-for="(summary, i) in summaries"
        :key="i"
        :summary="summary"
      />
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
      <div class="bg-white p-6 rounded-lg shadow">
        <h2 class="text-lg font-semibold text-gray-800 mb-4">User Growth</h2>
        <ClientOnly>
          <VueApexCharts
            type="area"
            :options="growthChartOptions"
            :series="growthChartSeries"
            height="280"
          />
          <template #fallback>
            <div class="h-72 flex items-center justify-center text-gray-500">
              Loading chart...
            </div>
          </template>
        </ClientOnly>
      </div>

      <div class="bg-white p-6 rounded-lg shadow">
        <h2 class="text-lg font-semibold text-gray-800 mb-4">Company Status</h2>
        <ClientOnly>
          <VueApexCharts
            type="donut"
            :options="statusChartOptions"
            :series="statusChartSeries"
            height="280"
          />
          <template #fallback>
            <div class="h-72 flex items-center justify-center text-gray-500">
              Loading chart...
            </div>
          </template>
        </ClientOnly>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div class="bg-white p-6 rounded-lg shadow">
        <h2 class="text-lg font-semibold text-gray-800 mb-4">Monthly Revenue</h2>
        <ClientOnly>
          <VueApexCharts
            type="bar"
            :options="revenueChartOptions"
            :series="revenueChartSeries"
            height="280"
          />
          <template #fallback>
            <div class="h-72 flex items-center justify-center text-gray-500">
              Loading chart...
            </div>
          </template>
        </ClientOnly>
      </div>

      <div class="bg-white p-6 rounded-lg shadow">
        <h2 class="text-lg font-semibold text-gray-800 mb-4">Active Users Trend</h2>
        <ClientOnly>
          <VueApexCharts
            type="line"
            :options="trendChartOptions"
            :series="trendChartSeries"
            height="280"
          />
          <template #fallback>
            <div class="h-72 flex items-center justify-center text-gray-500">
              Loading chart...
            </div>
          </template>
        </ClientOnly>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue';
import { markRaw } from 'vue';
import buildingIcon from '~/components/icons/building.vue';
import carouselVerticalIcon from '~/components/icons/carousel-vertical.vue';
import chalkboardIcon from '~/components/icons/chalkboard.vue';
import bussinesPlanIcon from '~/components/icons/bussines-plan.vue';
import { useUserStore } from '~/store/users';

definePageMeta({
  middleware: 'auth',
});

interface Summary {
  name: string;
  value: number;
  percentage: number;
  icon: any;
}

const userStore = useUserStore();
const currentUser = computed(() => userStore.me);
const token = useCookie('auth_token');

const summaries = ref<Summary[]>([
  {
    name: 'Total Companies',
    value: 0,
    percentage: 0,
    icon: markRaw(buildingIcon),
  },
  {
    name: 'Active Companies',
    value: 0,
    percentage: 0,
    icon: markRaw(carouselVerticalIcon),
  },
  {
    name: 'Total Subscribers',
    value: 0,
    percentage: 0,
    icon: markRaw(chalkboardIcon),
  },
  {
    name: 'Total Earnings',
    value: 0,
    percentage: 0,
    icon: markRaw(bussinesPlanIcon),
  },
]);

const growthChartOptions = ref({
  chart: { id: 'user-growth', toolbar: { show: false }, zoom: { enabled: false } },
  xaxis: {
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
    labels: { style: { colors: '#6B7280' } },
  },
  yaxis: { labels: { style: { colors: '#6B7280' } } },
  stroke: { curve: 'smooth' },
  colors: ['#3B82F6'],
  dataLabels: { enabled: false },
  fill: { type: 'gradient', gradient: { shadeIntensity: 1, opacityFrom: 0.7, opacityTo: 0.1 } },
  grid: { borderColor: '#E5E7EB' },
  tooltip: { theme: 'light' },
});

const growthChartSeries = ref([
  { name: 'New Companies',  data: [30, 40, 35, 50, 49, 60, 90, 10, 80] }
]);

const statusChartOptions = ref({
  chart: { id: 'status-donut', toolbar: { show: false } },
  labels: ['Active', 'Inactive', 'Pending'],
  colors: ['#10B981', '#EF4444', '#F59E0B'],
  legend: { position: 'bottom', offsetY: 10 },
  plotOptions: { pie: { donut: { labels: { show: false } } } },
});

const statusChartSeries = ref([10, 20, 10]);

const revenueChartOptions = ref({
  chart: { id: 'revenue-bar', toolbar: { show: false } },
  xaxis: {
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    labels: { style: { colors: '#6B7280' } },
  },
  yaxis: { labels: { style: { colors: '#6B7280' } } },
  plotOptions: { bar: { borderRadius: 4, horizontal: false } },
  colors: ['#8B5CF6'],
  dataLabels: { enabled: false },
  grid: { borderColor: '#E5E7EB' },
});

const revenueChartSeries = ref([
  { name: 'Revenue (IDR)', data: [12000, 19000, 15000, 22000, 18000] },
]);

const trendChartOptions = ref({
  chart: { id: 'trend-line', toolbar: { show: false }, zoom: { enabled: false } },
  xaxis: {
    categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    labels: { style: { colors: '#6B7280' } },
  },
  stroke: { width: 3, curve: 'smooth' },
  colors: ['#EC4899'],
  dataLabels: { enabled: false },
  markers: { size: 4, colors: ['#EC4899'] },
  grid: { borderColor: '#E5E7EB' },
  tooltip: { theme: 'light' },
});

const trendChartSeries = ref([
  { name: 'Active Users',  data: [40, 60, 55, 70, 65, 80, 75] },
]);

const getDataSummary = async () => {
  try {
    const response: { totalCompany: number; active: number; inactive: number; pending: number } = await $fetch('/api/companies/summary', {
      headers: { Authorization: `Bearer ${token.value}` },
    });

    summaries.value[0].value = response.totalCompany ?? 0;
    summaries.value[1].value = response.active ?? 0;
    summaries.value[2].value = response.active ?? 0;
    summaries.value[3].value = response.totalCompany * 15890;

    statusChartSeries.value = [
      response.active ?? 0,
      response.inactive ?? 0,
      response.pending ?? 0,
    ];
  } catch (error) {
    console.error('Error fetching company summary:', error);
  }
};

onMounted(() => {
  getDataSummary();
});
</script>
