<script lang="ts" setup>
import type { User, UserTable } from '~/types/user.type';

const route = useRoute();
const isLoading = ref<boolean>(false);

const headerTables = computed(() => {
	let datas: any[] | undefined = undefined;

	const slug = route.params.slug;

	if (slug.includes('user-lists')) {
		datas = [
			{
				name: 'Name',
				key: 'name',
			},
			{
				name: 'Email',
				key: 'email',
			},
			{
				name: 'Status',
				key: 'status',
			},
			{
				name: 'Roles',
				key: 'roles',
			},
			{
				name: 'Actions',
				key: 'actions',
			},
		];
	}

	return datas;
});

const datas = ref<UserTable[]>([]);

const getDataUsers = async () => {
	isLoading.value = true;
	try {
		const fetchedUsers = await $fetch('/api/users');
		isLoading.value = false;

		datas.value = (fetchedUsers.data ?? []).map((user) => ({
			name: user.name ?? '-',
			email: user.email ?? '-',
			status: user.status ?? 'inactive',
			role: user.role ?? 'superadmin',
			actions: null,
		}));
	} catch (error) {
		isLoading.value = false;
	}
};

onMounted(() => {
	getDataUsers();
});
</script>

<template>
	<div>
		<UsersSummary />

		<div class="mt-4">
			<div class="bg-white shadow p-4 rounded-md">
				<UiTable
					:headers="headerTables"
					:datas="datas ?? []"
					:is-loading="isLoading" />
			</div>
		</div>
	</div>
</template>
