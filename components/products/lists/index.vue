<script lang="ts" setup>
import dayjs from 'dayjs';
import type { TableColumn } from '~/components/ui/Table.vue';
import type { ProductResponse } from '~/types/product.types';

// --- STATE ---
const token = useCookie('auth_token');
const isLoading = ref<boolean>(true);

// --- HEADERS: Lebih dinamis dengan tipe ---
const headers = reactive<TableColumn[]>([
	{
		key: 'name',
		label: 'Name Theme',
		type: 'text',
	},
	{
		key: 'status',
		label: 'Status',
		type: 'status',
	},
	{
		key: 'price',
		label: 'price',
		type: 'text',
	},
	{
		key: 'stock',
		label: 'Stock',
		type: 'text',
	},
  {
    key: 'company.name',
    label: "Company",
    type: "text",
  },
	{
		key: 'created_at',
		label: 'Created At',
		type: 'date',
		format: 'DD MMMM YYYY',
	},
	{
		key: 'actions',
		label: 'Actions',
		type: 'actions',
		align: 'center',
	},
]);

// --- DATA ---
const products = ref<ProductResponse | null>(null);

// --- FETCH DATA ---
const getDataProducts = async () => {
	try {
		const fetchedData = await $fetch<ProductResponse>('/api/products', {
			headers: {
				Authorization: `Bearer ${token.value}`,
			},
		});
		products.value = fetchedData;
	} catch (error) {
		console.error('Failed to fetch products:', error);
		// products.value = { data: [], total: 0, page: 1 }; // fallback
	} finally {
		isLoading.value = false;
	}
};

onMounted(() => {
	getDataProducts();
});

// --- EMIT HANDLER untuk aksi ---
const handleDelete = (product: any) => {
	if (confirm(`Hapus tema "${product.name_theme}"?`)) {
		console.log('Deleting:', product);
		// TODO: Panggil API delete
	}
};

const handleUpdate = (product: any) => {
	console.log('Edit:', product);
	// TODO: Buka modal edit
};

// Fungsi capitalize jika digunakan di template
const formattedCapitalize = (str: string | string[]) => {
	if (!str) return '';
	const s = Array.isArray(str) ? str[0] : str;
	return s.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
};
</script>

<template>
	<div class="mt-4 bg-white shadow p-4 rounded-2xl">
		<!-- Gunakan BaseTable / UiTable yang sudah dinamis -->
		<UiTable
			:headers="headers"
			:datas="products?.data || []"
			:is-loading="isLoading"
			@delete="handleDelete"
			@update="handleUpdate"
			@open-modal-create="$router.push('/products/create')">
			<!-- Opsional: Custom rendering jika ingin override sel tertentu -->

			<!-- Contoh: Custom tampilan untuk Created At -->
			<template #cell(created_at)="{ value }">
				<span class="text-sm text-slate-600">
					{{ dayjs(value).format('DD MMM YYYY • HH:mm') }}
				</span>
			</template>

			<!-- Custom status bisa juga ditambahkan, tapi sudah otomatis di BaseTable -->
		</UiTable>
	</div>
</template>
