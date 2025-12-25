<script lang="ts" setup>
import { ref, computed } from 'vue';
import dayjs from 'dayjs';

// Interface for header
export interface TableColumn {
  key: string;
  label: string;
  type?: 'text' | 'date' | 'status' | 'image' | 'custom' | 'actions';
  format?: string; // date format
  align?: 'left' | 'center' | 'right';
  sortable?: boolean;
  render?: (value: any, row: any) => string; // optional function render
}

interface TableData {
  [key: string]: any;
}

const props = withDefaults(
  defineProps<{
    headers?: TableColumn[];
    datas?: TableData[];
    showTitle?: boolean;
    isLoading?: boolean;
    itemsPerPage?: number;
    itemsTotalPages?: number;
    itemsCurrentPage?: number;
    itemsTotalData?: number;
  }>(),
  {
    headers: () => [
      { key: 'name', label: 'Company Name', type: 'text' },
      { key: 'email', label: 'Email', type: 'text' },
      { key: 'url', label: 'Account URL', type: 'text' },
      { key: 'status', label: 'Status', type: 'status' },
      { key: 'actions', label: 'Actions', type: 'actions' },
    ],
    datas: () => [],
    showTitle: true,
    isLoading: false,
    itemsPerPage: 5,
  }
);

const emit = defineEmits(['open-modal-create', 'delete', 'update', 'sort', 'next-page', 'prev-page', 'change-per-page']);

const currentPage = ref(props.itemsCurrentPage ?? 1);
const localItemsPerPage = computed(() => props.itemsPerPage);

// get data paginated
const paginatedData = computed(() => {
  return props.datas;
});

// Total Pages
const totalPages = computed(() => props.itemsTotalPages ?? (Math.ceil((props.datas.length || 0) / localItemsPerPage.value)));

// Generate pagination Button (Max 5 button)
const pages = computed(() => {
  const total = totalPages.value;
  const current = currentPage.value;
  const range = [];

  if (total <= 5) {
    for (let i = 1; i <= total; i++) range.push(i);
  } else {
    if (current <= 3) {
      range.push(1, 2, 3, 4, 5, '...');
    } else if (current >= total - 2) {
      range.push('...', total - 4, total - 3, total - 2, total - 1, total);
    } else {
      range.push('...', current - 1, current, current + 1, '...');
    }
  }

  return range;
});

function goToPage(page: number | string) {
  if (typeof page === 'number') currentPage.value = page;
  emit('next-page', currentPage.value);
}

function prevPage() {
  if (currentPage.value > 1) currentPage.value--;
  emit('prev-page', currentPage.value);
}

function nextPage() {
  if (currentPage.value < totalPages.value) currentPage.value++;
  emit('next-page', currentPage.value);
}

//  Helpers: get value nested (ex: user.profile.createdAt)
function getNestedValue(obj: any, path: string): any {
  return path.split('.').reduce((acc, key) => acc?.[key], obj);
}

// Format Value accourdion column type
function formatValue(value: any, column: TableColumn, row: any) {
  if (column.render) return column.render(value, row);

  switch (column.type) {
    case 'date':
      return dayjs(value).format(column.format || 'DD MMM YYYY');
    case 'status':
      return value;
    case 'image':
      return value;
    default:
      return value ?? '-';
  }
}

const openModalCreate = () => {
  emit('open-modal-create');
};

const handleChangePerPage = (value: string) => {
  emit('change-per-page', parseInt(value));

}
</script>

<template>
  <div class="base-table">
    <!-- Title -->
    <div v-if="showTitle">
      <span class="font-bold text-slate-500 capitalize">
        {{ $route.params.slug ? formattedCapitalize($route.params.slug) : 'Data' }}
      </span>
    </div>

    

    <!-- Table -->
    <table class="min-w-full divide-y divide-gray-200 rounded-xl shadow">
      <thead class="bg-gray-50">
        <tr>
          <th class="px-6 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">
            <BaseCheckbox :checked="false" />
          </th>
          <th v-for="col in headers" :key="col.key" :class="[
            'px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider',
            col.align === 'center' ? 'text-center' : col.align === 'right' ? 'text-right' : 'text-left'
          ]">
            {{ $t(col.label) }}
          </th>
        </tr>
      </thead>

      <tbody class="bg-white divide-y divide-gray-200">
        <!-- Loading State -->
        <tr v-if="isLoading">
          <td :colspan="headers.length + 1" class="px-6 py-10 text-center">
            <div class="flex flex-col items-center justify-center space-y-3">
              <img src="/loading-gif.gif" alt="Loading..." class="w-40 h-40" />
              <p class="text-sm text-slate-500">{{ $t("loading_text") }}</p>
            </div>
          </td>
        </tr>

        <!-- Data Rows -->
        <template v-else>
          <tr v-for="(row, index) in paginatedData" :key="index"
            class="hover:bg-gray-50 transition-colors duration-200">
            <td class="px-6 py-4">
              <BaseCheckbox :checked="false" />
            </td>
            <td v-for="col in headers" :key="col.key" :class="[
              'px-6 py-4 whitespace-nowrap text-sm text-gray-900',
              col.align === 'center' ? 'text-center' : col.align === 'right' ? 'text-right' : 'text-left'
            ]">
              <!-- Slot kustom untuk kolom tertentu -->
              <slot :name="`cell(${col.key})`" :value="getNestedValue(row, col.key)" :row="row">
                <!-- Default rendering -->
                <div v-if="col.type === 'actions'" class="flex items-center justify-center space-x-2">
                  <button @click="$emit('delete', row)" class="text-red-500 hover:text-red-700">
                    <IconsTrash class="w-5 h-5" />
                  </button>
                  <button @click="$emit('update', row)" class="text-blue-500 hover:text-blue-700">
                    <IconsUpdate class="w-5 h-5" />
                  </button>
                </div>

                <div v-else-if="col.type === 'image' && getNestedValue(row, col.key)">
                  <img :src="getNestedValue(row, col.key)" :alt="col.label"
                    class="w-16 h-12 object-cover rounded border" />
                </div>

                <span v-else-if="col.type === 'status'" class="px-2 py-1 rounded-full text-xs font-semibold capitalize"
                  :class="{
                    'bg-green-100 text-green-800': ['active', 'Active', 'available'].includes(getNestedValue(row, col.key)),
                    'bg-red-100 text-red-800': ['inactive', 'Inactive'].includes(getNestedValue(row, col.key)),
                    'bg-yellow-100 text-yellow-800': ['pending'].includes(getNestedValue(row, col.key)?.toLowerCase())
                  }">
                  {{ formatValue(getNestedValue(row, col.key), col, row) }}
                </span>

                <span v-else>{{ formatValue(getNestedValue(row, col.key), col, row) }}</span>
              </slot>
            </td>
          </tr>

          <!-- Empty State -->
          <tr v-if="!isLoading && (!datas || datas.length === 0)">
            <td :colspan="headers.length + 1" class="py-10 text-center space-y-3">
              <div class="flex justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-slate-400" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p class="text-lg font-semibold text-slate-700">Data tidak tersedia</p>
              <p class="text-sm text-slate-500">Silakan tambahkan data atau coba ubah filter pencarian.</p>
            </td>
          </tr>
        </template>
      </tbody>
    </table>

    <!-- Pagination -->
    <div :class="['flex justify-between mt-6']">
      <div v-if="!isLoading && datas.length > 0" class="flex items-center">
        <select class="p-1 mt-2 rounded border border-gray-200" :value="props.itemsPerPage" @change="(e) => {
          handleChangePerPage((e.target as HTMLSelectElement).value)
        }">
          <option value="5">5</option>
          <option value="10">10</option>
        </select>
      </div>
      <div v-if="!isLoading && datas.length > 0" class="flex items-center justify-end gap-4">
        <button @click="prevPage" :disabled="currentPage === 1"
          class="px-4 py-2 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition">
          Previous
        </button>

        <div class="flex space-x-1">
          <button v-for="page in pages" :key="page" @click="goToPage(page)" :class="[
            'px-3 py-1 rounded-md text-sm font-medium transition',
            currentPage === page ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          ]">
            {{ page }}
          </button>
        </div>

        <button @click="nextPage" :disabled="currentPage === totalPages"
          class="px-4 py-2 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition">
          Next
        </button>
      </div>
    </div>
  </div>
</template>
