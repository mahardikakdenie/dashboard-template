<script lang="ts" setup>
import { ref, computed, watch } from 'vue';
import dayjs from 'dayjs';

export interface TableColumn {
  key: string;
  label: string;
  type?: 'text' | 'date' | 'status' | 'image' | 'custom' | 'actions';
  format?: string;
  align?: 'left' | 'center' | 'right';
  sortable?: boolean;
  render?: (value: any, row: any) => string;
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
    selectedRows?: TableData[];
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
    selectedRows: () => [],
  }
);

const emit = defineEmits<{
  (e: 'open-modal-create'): void;
  (e: 'delete', row: TableData): void;
  (e: 'update', row: TableData): void;
  (e: 'sort', key: string): void;
  (e: 'next-page', page: number): void;
  (e: 'prev-page', page: number): void;
  (e: 'change-per-page', value: number): void;
  (e: 'update:selectedRows', rows: TableData[]): void;
}>();

const currentPage = ref(props.itemsCurrentPage ?? 1);
const localSelectedRows = ref<TableData[]>([...props.selectedRows]);

watch(
  () => props.selectedRows,
  (newVal) => {
    localSelectedRows.value = [...newVal];
  },
  { deep: true }
);

const paginatedData = computed(() => props.datas);

const totalPages = computed(() =>
  props.itemsTotalPages ?? Math.ceil((props.datas.length || 0) / props.itemsPerPage)
);

const allRowsSelected = computed(() => {
  return paginatedData.value.length > 0 && localSelectedRows.value.length === paginatedData.value.length;
});

const someRowsSelected = computed(() => {
  return localSelectedRows.value.length > 0 && !allRowsSelected.value;
});

const toggleAll = () => {
  if (allRowsSelected.value) {
    localSelectedRows.value = [];
  } else {
    localSelectedRows.value = [...paginatedData.value];
  }
  emit('update:selectedRows', localSelectedRows.value);
};

const toggleRow = (row: TableData) => {
  const index = localSelectedRows.value.findIndex(r => r === row);
  if (index >= 0) {
    localSelectedRows.value.splice(index, 1);
  } else {
    localSelectedRows.value.push(row);
  }
  emit('update:selectedRows', localSelectedRows.value);
};

const pages = computed(() => {
  const total = totalPages.value;
  const current = currentPage.value;
  if (total <= 5) return Array.from({ length: total }, (_, i) => i + 1);
  if (current <= 3) return [1, 2, 3, 4, 5, '...'];
  if (current >= total - 2) return ['...', total - 4, total - 3, total - 2, total - 1, total];
  return ['...', current - 1, current, current + 1, '...'];
});

const goToPage = (page: number | string) => {
  if (typeof page === 'number') currentPage.value = page;
  emit('next-page', currentPage.value);
};

const prevPage = () => {
  if (currentPage.value > 1) currentPage.value--;
  emit('prev-page', currentPage.value);
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value++;
  emit('next-page', currentPage.value);
};

const getNestedValue = (obj: any, path: string): any => {
  return path.split('.').reduce((acc, key) => acc?.[key], obj);
};

const formatValue = (value: any, column: TableColumn, row: any) => {
  if (column.render) return column.render(value, row);
  switch (column.type) {
    case 'date':
      return dayjs(value).format(column.format || 'DD MMM YYYY');
    case 'status':
    case 'image':
      return value;
    default:
      return value ?? '-';
  }
};

const handleChangePerPage = (e: Event) => {
  const target = e.target as HTMLSelectElement;
  emit('change-per-page', parseInt(target.value));
};
</script>

<template>
  <div class="base-table">
    <div v-if="showTitle" class="mb-5">
      <span class="font-bold text-slate-500 capitalize">
        {{ $route.params.slug ? formattedCapitalize($route.params.slug) : 'Data' }}
      </span>
    </div>

    <table class="min-w-full divide-y divide-gray-200 rounded-xl shadow">
      <thead class="bg-gray-50">
        <tr>
          <th class="px-6 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">
            <BaseCheckbox
              :checked="allRowsSelected"
              :indeterminate="someRowsSelected"
              @update:checked="toggleAll"
            />
          </th>
          <th
            v-for="col in headers"
            :key="col.key"
            :class="[
              'px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider',
              col.align === 'center' ? 'text-center' : col.align === 'right' ? 'text-right' : 'text-left',
            ]"
          >
            {{ $t(col.label) }}
          </th>
        </tr>
      </thead>

      <tbody class="bg-white divide-y divide-gray-200">
        <tr v-if="isLoading">
          <td :colspan="headers.length + 1" class="px-6 py-10 text-center">
            <div class="flex flex-col items-center justify-center space-y-3">
              <img src="/loading-gif.gif" alt="Loading..." class="w-40 h-40" />
              <p class="text-sm text-slate-500">{{ $t('loading_text') }}</p>
            </div>
          </td>
        </tr>

        <template v-else>
          <tr
            v-for="(row, index) in paginatedData"
            :key="index"
            class="hover:bg-gray-50 transition-colors duration-200"
          >
            <td class="px-6 py-4">
              <BaseCheckbox
                :checked="localSelectedRows.includes(row)"
                @update:checked="() => toggleRow(row)"
              />
            </td>
            <td
              v-for="col in headers"
              :key="col.key"
              :class="[
                'px-6 py-4 whitespace-nowrap text-sm text-gray-900',
                col.align === 'center' ? 'text-center' : col.align === 'right' ? 'text-right' : 'text-left',
              ]"
            >
              <slot :name="`cell(${col.key})`" :value="getNestedValue(row, col.key)" :row="row">
                <div v-if="col.type === 'actions'" class="flex items-center justify-center space-x-2">
                  <button @click="emit('delete', row)" class="text-red-500 hover:text-red-700">
                    <IconsTrash class="w-5 h-5" />
                  </button>
                  <button @click="emit('update', row)" class="text-blue-500 hover:text-blue-700">
                    <IconsUpdate class="w-5 h-5" />
                  </button>
                </div>
                <div v-else-if="col.type === 'image' && getNestedValue(row, col.key)">
                  <img :src="getNestedValue(row, col.key)" :alt="col.label" class="w-16 h-12 object-cover rounded border" />
                </div>
                <span
                  v-else-if="col.type === 'status'"
                  class="px-2 py-1 rounded-full text-xs font-semibold capitalize"
                  :class="{
                    'bg-green-100 text-green-800': ['active', 'Active', 'available'].includes(getNestedValue(row, col.key)),
                    'bg-red-100 text-red-800': ['inactive', 'Inactive'].includes(getNestedValue(row, col.key)),
                    'bg-yellow-100 text-yellow-800': ['pending'].includes(getNestedValue(row, col.key)?.toLowerCase()),
                    'bg-purple-100 text-purple-800': !['active', 'Active', 'available'].includes(getNestedValue(row, col.key))
                  }"
                >
                  {{ formatValue(getNestedValue(row, col.key), col, row) }}
                </span>
                <span v-else>{{ formatValue(getNestedValue(row, col.key), col, row) }}</span>
              </slot>
            </td>
          </tr>

          <tr v-if="!isLoading && (!datas || datas.length === 0)">
            <td :colspan="headers.length + 1" class="py-10 text-center">
              <div class="flex justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p class="text-lg font-semibold text-slate-700">Data tidak tersedia</p>
              <p class="text-sm text-slate-500">Silakan tambahkan data atau coba ubah filter pencarian.</p>
            </td>
          </tr>
        </template>
      </tbody>
    </table>

    <div class="flex justify-between mt-6">
      <div v-if="!isLoading && datas.length > 0" class="flex items-center">
        <select
          class="p-1 mt-2 rounded border border-gray-200"
          :value="props.itemsPerPage"
          @change="handleChangePerPage"
        >
          <option value="5">5</option>
          <option value="10">10</option>
        </select>
      </div>
      <div v-if="!isLoading && datas.length > 0" class="flex items-center justify-end gap-4">
        <button
          @click="prevPage"
          :disabled="currentPage === 1"
          class="px-4 py-2 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          Previous
        </button>
        <div class="flex space-x-1">
          <button
            v-for="page in pages"
            :key="page"
            @click="goToPage(page)"
            :class="[
              'px-3 py-1 rounded-md text-sm font-medium transition',
              currentPage === page
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200',
            ]"
          >
            {{ page }}
          </button>
        </div>
        <button
          @click="nextPage"
          :disabled="currentPage === totalPages"
          class="px-4 py-2 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          Next
        </button>
      </div>
    </div>
  </div>
</template>
