<script lang="ts" setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import type { ProductResponse } from '~/types/product.types';
const route = useRoute();
const dataTables = computed(() => {
	return route.params.slug;
});

const isProductListPage = computed(() => route.params.slug === 'product-list');
</script>
<template>
	<div>
		<users-summary />
		<div class="mt-4 bg-white shadow p-4 rounded-2xl">
			<products-lists />
		</div>
	</div>
</template>
z
