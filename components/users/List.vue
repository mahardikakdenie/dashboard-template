<script lang="ts" setup>
import type { User, UserTable } from '~/types/user.type';
import type { TableColumn } from '../ui/Table.vue';

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

// --- Fetch Users ---
const getDataUsers = async () => {
  isLoading.value = true;
  try {
    const response = await $fetch<{ data: User[] }>('/api/users');

    datas.value = (response.data ?? []).map((user) => ({
      id: user.id,
      name: user.name ?? '-',
      email: user.email ?? '-',
      status: user.status ?? 'inactive',
      role:  user.role || 'superadmin', // Asumsi role bisa objek atau string
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
          @delete="handleDelete"
          @update="handleUpdate"
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
