<template>
    <div>
        <UsersSummary />
        
        <div class="mt-4">
            <div class="bg-white shadow p-4 rounded-md">
                <UiTable :headers="headerTables" :datas="dataTables" />
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
const route = useRoute();
const dataTables = computed(() => {
    let datas: any[] = [];

    const slug = route.params.slug;
    if (slug.includes('user-lists')) {
        datas = [
            {
                name: 'Superadmin',
                email: 'superadmin@mail.com',
                status: 'Active',
                roles: 'Superadmin',
                actions: 'Edit | Delete'
            }
        ];
    }
    

    return datas;
});

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
            }
        ];
    }

    return datas;
})
</script>
