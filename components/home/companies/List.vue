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
import type { ComponentOptionsMixin, DefineComponent, Raw } from 'vue';
const datas = ref<Company[]>([]);

type TSUMMARY = {
		name: string;
		value: number;
		percentage: number;
		icon: Raw<
			DefineComponent<
				{},
				{},
				{},
				{},
				{},
				ComponentOptionsMixin,
				ComponentOptionsMixin,
				{},
				any
			>
		>;
	}


const summaries = ref<
	TSUMMARY[]
>([
	{
		name: 'total_companies',
		value: 0,
		percentage: 20,
		icon: markRaw(buildingIcon),
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

const getCompanySummary = async () => {
	const response = await $fetch('/api/companies/summary', {
		headers: {
			Authorization: `Bearer ${userStore.token}`,
		},
	});

	summaries.value[0].value = response.data.all;
};

onMounted(async () => {
	await getCompanyData();
	await getCompanySummary();
});
</script>
