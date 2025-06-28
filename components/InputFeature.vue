<template>
	<div class="relative max-w-xs w-full">
		<input
			id="search"
			type="text"
            :placeholder="placeholder"
			class="pr-9 py-2 pl-5 w-full text-sm rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200" />
		<label
			for="search"
			class="absolute inset-y-0 right-3 flex items-center pl-3 pointer-events-none text-gray-500">
			<IconsSearchIcons />
		</label>
	</div>
</template>

<script lang="ts" setup>
const props = withDefaults(defineProps<{
    placeholder?: string
}>(), {
    placeholder: 'Cari Pesanan..',
});
</script>
