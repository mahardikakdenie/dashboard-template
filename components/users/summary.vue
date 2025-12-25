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
import { useUserStore } from '~/store/users';

export interface Summary {
	name: string;
	value: number;
	percentage: number;
	icon: any;
}

const summaries = ref<Summary[]>([
	{
		name: 'total_users',
		value: 0,
		percentage: 20,
		icon: markRaw(buildingIcon),
	},
	{
		name: 'active_users',
		value: 0,
		percentage: 20,
		icon: markRaw(carouselVerticalIcon),
	},
	{
		name: 'inactive_users',
		value: 0,
		percentage: 20,
		icon: markRaw(chalkboardIcon),
	},
	{
		name: 'new_users',
		value: 0,
		percentage: 40,
		icon: markRaw(bussinesPlanIcon),
	},
]);


const userStore = useUserStore();

const getDataSummary = async () => {
	try {
		const response = await $fetch('/api/users/summaries', {
			headers: { Authorization: `Bearer ${userStore.token}` },
		});
		
		summaries.value[0].value = response.data.all ?? 0;
		summaries.value[1].value = response.data.active ?? 0;
		summaries.value[2].value = response.data.inactive ?? 0;
		summaries.value[3].value = response.data.new ?? 0;
	} catch (error) {
		console.error('Error fetching summary data:', error);
	}
};

onMounted(() => {
	getDataSummary();
});
</script>
