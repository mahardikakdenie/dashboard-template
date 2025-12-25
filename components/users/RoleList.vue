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
		const response = await $fetch<{meta: META, data: any}>('/api/roles', {
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

onMounted(() => {
	getDataRoles();
});
</script>

<template>
	<div class="mt-5">
		<UsersSummary />
		<div class="bg-white shadow rounded-2xl p-5 mt-4">
			<div class="mt-5">
				<UiTable
					:headers="headers"
					:datas="datas"
					:is-loading="isLoading" />
			</div>
		</div>
	</div>
</template>
