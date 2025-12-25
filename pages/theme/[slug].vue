<template>
    <div>
        <div class="mt-5" v-if="isPostThemePage">
            <themes-pos-theme />
        </div>
    </div>
</template>
<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
});
const route = useRoute();

const isPostThemePage = computed(() => route.params.slug === 'pos-theme');
</script>
