<script lang="ts" setup>
import type { User, UserTable } from '~/types/user.type';
import type { TableColumn } from '../ui/Table.vue';
import { useUserStore } from '~/store/users';
import type { META } from '~/types/common.types';

const route = useRoute();
const isLoading = ref<boolean>(false);

const defaultHeaders: TableColumn[] = [
  {
    key: 'name',
    label: 'Name',
    type: 'text',
  },
  {
    key: 'email',
    label: 'Email',
    type: 'text',
  },
  {
    key: 'phone',
    label: 'Phone',
    type: 'text',
  },
  {
    key: 'username',
    label: 'Username',
    type: 'text',
  },
  {
    key: 'status',
    label: 'Status',
    type: 'status',
  },
  {
    key: 'role',
    label: 'Role',
    type: 'text',
  },
  {
    key: 'actions',
    label: 'Actions',
    type: 'actions',
  },
];

const headerTables = computed<TableColumn[]>(() => {
  const slug = Array.isArray(route.params.slug) ? route.params.slug[0] : (route.params.slug as string);

  if (typeof slug === 'string' && slug.includes('user-lists')) {
    return defaultHeaders;
  }

  return defaultHeaders;
});

const datas = ref<UserTable[]>([]);
const meta = ref<META>();
const perPage = ref<number>(5);
const modalCloseVisible = ref<boolean>(false);

const userStore = useUserStore();
const getDataUsers = async (currentPage: number = 1) => {
  isLoading.value = true;
  try {
    const response = await $fetch<{ data: User[]; meta: META }>('/api/users', {
      params: {
        limit: perPage.value,
        page: currentPage,
      },
      headers: { Authorization: `Bearer ${userStore.token}` },
    });

    meta.value = response.meta;

    datas.value = (response.data ?? []).map((user) => ({
      id: user.id,
      name: user.name ?? '-',
      username: user.username ?? '-',
      email: user.email ?? '-',
      status: user.status ?? 'inactive',
      phone: user.phone ?? '-',
      role: String(user.role?.name || 'unrole'),
    }));
  } catch (error) {
    console.error('Failed to fetch users:', error);
    datas.value = [];
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  getDataUsers();
});

const handleChangePage = (currentPage: number) => {
  getDataUsers(currentPage);
};

const handleChangePerpage = (currentPerpage: number) => {
  perPage.value = currentPerpage;
  getDataUsers();

};

const handleDelete = (user: UserTable) => {
  if (confirm(`Hapus user ${user.name}?`)) {
    console.log('Deleting user:', user);
  }
};

const handleUpdate = (user: UserTable) => {
  console.log('Edit user:', user);
};

const openModalCreate = () => { 
  modalCloseVisible.value = !modalCloseVisible.value;
};
</script>

<template>
  <div>
    <UsersSummary />

    <div class="mt-4">
      <div class="bg-white shadow p-4 rounded-md">
        <!-- Search & Actions -->
        <div class="flex justify-between my-4">
          <div>
            <slot name="search">
              <InputFeature placeholder="Search..." />
            </slot>
          </div>
          <div class="flex flex-wrap items-center gap-4">
            <!-- Create Button -->
            <button
              class="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-slate-600 border border-slate-700 rounded-md shadow-sm hover:bg-slate-700 focus:outline-none focus:ring-2 transition-all duration-200"
              @click="openModalCreate">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
              </svg>
              Create Data
            </button>

            <!-- Filter Button -->
            <button
              class="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-slate-500 border border-slate-600 rounded-md shadow-sm hover:bg-slate-600 focus:outline-none focus:ring-2 transition-all duration-200">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707v5.172a1 1 0 01-.293.707l-2 2a1 1 0 01-1.414 0l-2-2a1 1 0 01-.293-.707v-5.172a1 1 0 00-.293-.707L3.293 5.293A1 1 0 013 4.586V4z" />
              </svg>
              Filter
            </button>
          </div>
        </div>
        <UiTable :headers="headerTables" :datas="datas" :is-loading="isLoading" :items-total-pages="meta?.last_page"
          :items-per-page="meta?.per_page" :items-current-page="meta?.page" :items-total-data="meta?.total"
          @delete="handleDelete" @update="handleUpdate" @next-page="handleChangePage" @prev-page="handleChangePage"
          @change-per-page="handleChangePerpage">
          <!-- Opsional: custom rendering -->
          <template #cell(role)="{ value }">
            <span class="px-2 py-1 bg-slate-100 text-slate-800 rounded-full text-xs font-medium">
              {{ value }}
            </span>
          </template>
        </UiTable>
        <UsersModalCreate v-if="modalCloseVisible" @close="modalCloseVisible = !modalCloseVisible" />
      </div>
    </div>
  </div>
</template>
