<template>
	<div
		class="border border-gray-200 rounded-xl p-4 bg-white shadow-md hover:shadow-lg transition-shadow duration-300">
		<div class="flex justify-between items-center">
			<!-- Icon Box -->
			<div
				class="bg-indigo-100 text-indigo-600 rounded-xl p-2 flex items-center justify-center shadow-sm">
				<component :is="summary.icon" class="w-4 h-4" />
			</div>

			<!-- Growth Badge -->
			<div>
				<span
					class="bg-green-100 text-green-700 text-xs font-medium px-2.5 py-1 rounded-full inline-flex items-center">
					<IconsGrowth />
					+{{ summary.percentage }}%
				</span>
			</div>
		</div>

		<!-- Stats Content -->
		<div class="mt-4">
			<div class="text-slate-800 text-xl font-bold">
				<span v-if="summary.name === 'Total Earning'">
					{{ formatToRupiah(summary.value.toString()) }}
				</span>
				<span v-else>
					{{ summary.value }}
				</span>
			</div>
			<div class="text-slate-500 text-sm font-medium mt-1">
				{{ summary.name }}
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import type { Summary } from '~/pages/index.vue';

const props = defineProps<{
	summary: Summary;
}>();
</script>
