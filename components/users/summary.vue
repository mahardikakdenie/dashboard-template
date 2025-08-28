<template>
	<div class="mt-4">
		<div class="grid sm:grid-cols-2 md:grid-cols-4 grid-cols-1 gap-4">
			<div v-for="(summary, i) in summaries" :key="i">
				<SummaryBox :summary="summary" />
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import buildingIcon from '~/components/icons/building.vue';
import carouselVerticalIcon from '~/components/icons/carousel-vertical.vue';
import chalkboardIcon from '~/components/icons/chalkboard.vue';
import bussinesPlanIcon from '~/components/icons/bussines-plan.vue';

export interface Summary {
	name: string;
	value: number;
	percentage: number;
	icon: any;
}

const summaries = ref<Summary[]>([
	{
		name: 'Total Users',
		value: 5672,
		percentage: 20,
		icon: markRaw(buildingIcon),
	},
	{
		name: 'Active Users',
		value: 4576,
		percentage: 20,
		icon: markRaw(carouselVerticalIcon),
	},
	{
		name: 'Non Active Users',
		value: 3696,
		percentage: 20,
		icon: markRaw(chalkboardIcon),
	},
	{
		name: 'New User This Month',
		value: 8987858,
		percentage: 40,
		icon: markRaw(bussinesPlanIcon),
	},
]);
</script>
