<template>
	<div>
		<div>
			<HomeCompaniesList v-if="slug === 'companies'" />
			<div v-else>
				halo
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
const route = useRoute();
const slug = computed(() => route?.params?.slug ?? '');
</script>
