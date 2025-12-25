<script lang="ts" setup>
import type { User, UserTable } from '~/types/user.type';
import type { TableColumn } from '../ui/Table.vue';
import { useUserStore } from '~/store/users';
import type { META } from '~/types/common.types';

const route = useRoute();
const isLoading = ref<boolean>(false);

// --- Default headers ---
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

// --- Tentukan headers berdasarkan slug ---
const headerTables = computed<TableColumn[]>(() => {
  const slug = Array.isArray(route.params.slug) ? route.params.slug[0] : (route.params.slug as string);

  if (typeof slug === 'string' && slug.includes('user-lists')) {
    return defaultHeaders;
  }

  // Return default jika slug tidak cocok
  return defaultHeaders;
});

// --- Data ---
const datas = ref<UserTable[]>([]);
const meta = ref<META>();
const perPage = ref<number>(5);

// --- Fetch Users ---

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
      email: user.email ?? '-',
      status: user.status ?? 'inactive',
      role: String(user.role?.name || 'superadmin'),
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

// --- Handler aksi ---
const handleDelete = (user: UserTable) => {
  if (confirm(`Hapus user ${user.name}?`)) {
    console.log('Deleting user:', user);
    // TODO: Panggil API delete
  }
};

const handleUpdate = (user: UserTable) => {
  console.log('Edit user:', user);
  // TODO: Buka modal edit
};
</script>

<template>
  <div>
    <!-- Ringkasan User -->
    <UsersSummary />

    <!-- Tabel Utama -->
    <div class="mt-4">
      <div class="bg-white shadow p-4 rounded-md">
        <UiTable
          :headers="headerTables"
          :datas="datas"
          :is-loading="isLoading"
          :items-total-pages="meta?.last_page"
          :items-per-page="meta?.per_page"
          :items-current-page="meta?.page"
          :items-total-data="meta?.total"
          @delete="handleDelete"
          @update="handleUpdate"
          @next-page="handleChangePage"
          @prev-page="handleChangePage"
          @change-per-page="handleChangePerpage"
        >
          <!-- Opsional: custom rendering -->
          <template #cell(role)="{ value }">
            <span class="px-2 py-1 bg-slate-100 text-slate-800 rounded-full text-xs font-medium">
              {{ value }}
            </span>
          </template>
        </UiTable>
      </div>
    </div>
  </div>
</template>
