<script lang="ts" setup>
import type { Role } from '~/types/user.type';
import type { TableColumn } from '../ui/Table.vue';
const token = useCookie('auth_token');

const headers = ref<TableColumn[]>([
    {
        key: "name",
        label: "Name"
    },
    {
        key: "created_by",
        label: "Created By",
        type: "text",
    },
    {
        key: "created_at",
        label: "Created At",
        format: 'DD MMMM YYYY',
        type: "date",
    },
    {
		key: 'actions',
		label: 'Actions',
		type: 'actions',
		align: 'center',
	},
]);

const datas = ref<Role[]>([]);
const getDataRoles = async () => {
    try {
        const response = await $fetch("/api/roles", {
            headers: {
                Authorization: `Bearer ${token.value}`,
            }
        });

        datas.value = response.data ?? [];
        
    } catch (error) {
        console.log("error fetched role data : ", error);
    }
};

onMounted(() => {
   getDataRoles(); 
});
</script>

<template>
    <div class="mt-5">
        <div class="bg-white shadow rounded-2xl p-5">
            <UsersSummary />

            <div class="mt-5">
                <UiTable :headers="headers" :datas="datas" />
            </div>
        </div>
    </div>
</template>
