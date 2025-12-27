<script lang="ts" setup>
import type { Role } from '~/types/user.type';
import type { TableColumn } from '../ui/Table.vue';
import type { META } from '~/types/common.types';
import { useUserStore } from '~/store/users';
const token = useCookie('auth_token');

const headers = ref<TableColumn[]>([
	{
		key: 'name',
		label: 'Name',
	},
	{
		key: 'descriptions',
		label: 'Descriptions',
		type: 'text',
	},
	{
		key: 'created_at',
		label: 'Created At',
		format: 'DD MMMM YYYY',
		type: 'date',
	},
	{
		key: 'actions',
		label: 'Actions',
		type: 'actions',
		align: 'center',
	},
]);

const datas = ref<Role[]>([]);
const isLoading = ref<boolean>(true);
const perPage = ref<number>(10);
const search = ref<string>('');
const userStore = useUserStore();
const getDataRoles = async (currentPage: number = 1) => {
	try {
		const token = userStore.token;
		const response = await $fetch<{ meta: META; data: any }>('/api/roles', {
			params: {
				page: currentPage,
				limit: perPage.value,
				search: search.value,
			},
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		datas.value = response.data ?? [];
		isLoading.value = false;
	} catch (error) {
		console.log('error fetched role data : ', error);
	}
};

const openModalCreate = () => {};

onMounted(() => {
	getDataRoles();
});
</script>

<template>
	<div class="mt-5">
		<RolesSummary />
		<div class="bg-white shadow rounded-2xl p-5 mt-4">
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
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="w-4 h-4"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M12 4v16m8-8H4" />
						</svg>
						Create Data
					</button>

					<!-- Filter Button -->
					<button
						class="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-slate-500 border border-slate-600 rounded-md shadow-sm hover:bg-slate-600 focus:outline-none focus:ring-2 transition-all duration-200">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="w-4 h-4"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707v5.172a1 1 0 01-.293.707l-2 2a1 1 0 01-1.414 0l-2-2a1 1 0 01-.293-.707v-5.172a1 1 0 00-.293-.707L3.293 5.293A1 1 0 013 4.586V4z" />
						</svg>
						Filter
					</button>
				</div>
			</div>
			<div class="mt-5">
				<UiTable
					:headers="headers"
					:datas="datas"
					:is-loading="isLoading" />
			</div>
		</div>
	</div>
</template>
