<script lang="ts" setup>
definePageMeta({
  middleware: 'auth'
});
const route = useRoute();
const isUserListPage = computed(() => route.params.slug === 'user-lists');
</script>


<template>
    <div>
        <UsersList v-if="isUserListPage" />
        <UsersRoleList v-else />
    </div>
</template>
