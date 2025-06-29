<template>
    <div>
        <div class="flex justify-between gap-4">
			<div class="flex items-center">
				<h4 class="font-bold text-xl capitalize">{{title}}</h4>
			</div>

			<div>
				<button class="px-5 py-2 bg-white text-sm font-medium text-gray-700 border cursor-pointer border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200">
                    Filter Date
                </button>
			</div>
		</div>
    </div>
</template>

<script setup lang="ts">
const route = useRoute();
const title = computed((): string => {
    if (typeof route?.params?.slug === 'object') {
        return route?.params?.slug[0].split('-').join(' ');
    } else {
        return route?.params?.slug.replace('-', ' ');
    }

    return '';
})
</script>
