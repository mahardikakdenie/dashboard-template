<script lang="ts" setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
const route = useRoute();
const dataTables = computed(() => {
	return route.params.slug;
});
</script>
<template>
	<div class="mt-4">
		<div class="bg-white shadow p-4 rounded-md">
			Halo
		</div>
	</div>
</template>
z
