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
import type { Summary } from '../index.vue';

const route = useRoute();
const title = computed((): string => {
    if (typeof route?.params?.slug === 'object') {
        return route?.params?.slug[0].split('-').join(' ');
    } else {
        return route?.params?.slug.replace('-', ' ');
    }

    return '';
});


const datas = ref<any>([
	{
		name: 'PT Friendsure Indonesia',
		email: 'office@teman.id',
		url: 'https://github.com/mahardikakdenie',
		status: 'Active',
	},
	{
		name: 'PT Friendsure Indonesia',
		email: 'office@teman.id',
		url: 'https://github.com/mahardikakdenie',
		status: 'Active',
	},
	{
		name: 'PT Friendsure Indonesia',
		email: 'office@teman.id',
		url: 'https://github.com/mahardikakdenie',
		status: 'Active',
	},
	{
		name: 'PT Friendsure Indonesia',
		email: 'office@teman.id',
		url: 'https://github.com/mahardikakdenie',
		status: 'Active',
	},
	{
		name: 'PT Friendsure Indonesia',
		email: 'office@teman.id',
		url: 'https://github.com/mahardikakdenie',
		status: 'Active',
	},
	{
		name: 'PT Friendsure Indonesia',
		email: 'office@teman.id',
		url: 'https://github.com/mahardikakdenie',
		status: 'Active',
	},
	{
		name: 'PT Friendsure Indonesia',
		email: 'office@teman.id',
		url: 'https://github.com/mahardikakdenie',
		status: 'Active',
	},
]);

const summaries = ref<Summary[]>([
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

</script>
