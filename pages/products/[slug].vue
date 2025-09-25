<script lang="ts" setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import type { ProductResponse } from '~/types/product.types';
definePageMeta({
  middleware: 'auth' // ← nama file tanpa ekstensi: 'auth'
});
const route = useRoute();

const isProductListPage = computed(() => route.params.slug === 'product-list');
</script>
<template>
	<div>
		<div class="">
			<themes-products-summary />
			<products-lists />
		</div>
	</div>
</template>
z
