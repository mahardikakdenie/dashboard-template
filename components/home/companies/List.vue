<template>
	<div>
		<div class="mt-4">
			<div class="grid grid-cols-4 gap-4">
				<div v-for="(summary, i) in summaries" :key="i">
					<SummaryBox :summary="summary" />
				</div>
			</div>
		</div>

		<div class="mt-4 shadow bg-white p-4 rounded-md">
			<UiTable :datas="datas" />
		</div>
	</div>
</template>

<script setup lang="ts">
import buildingIcon from '~/components/icons/building.vue';
import carouselVerticalIcon from '~/components/icons/carousel-vertical.vue';
import chalkboardIcon from '~/components/icons/chalkboard.vue';
import bussinesPlanIcon from '~/components/icons/bussines-plan.vue';
import { useUserStore } from '~/store/users';
import type { Company } from '~/types/company.types';
// import type { Summary } from '../index.vue';

const datas = ref<Company[]>([
]);

const summaries = ref<any>([
	{
		name: 'Total Companies',
		value: 5672,
		percentage: 20,
		icon: markRaw(buildingIcon),
	},
	{
		name: 'Active Companies',
		value: 4576,
		percentage: 20,
		icon: markRaw(carouselVerticalIcon),
	},
	{
		name: 'Total Subscribers',
		value: 3696,
		percentage: 20,
		icon: markRaw(chalkboardIcon),
	},
	{
		name: 'Total Earning',
		value: 8987858,
		percentage: 40,
		icon: markRaw(bussinesPlanIcon),
	},
]);

const userStore = useUserStore();

const getCompanyData = async () => {
	const response = await $fetch('/api/companies', {
		headers: { Authorization: `Bearer ${userStore.token}` },
	});
	datas.value = response.data.map((company: any) => ({
		...company,
		created_at: new Date(company.created_at),
	}));
};

onMounted(async () => {
	await getCompanyData();
});
</script>
