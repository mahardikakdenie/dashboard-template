<template>
	<div>
		<div class="flex justify-between gap-4">
			<div class="flex items-center">
				<h4 class="font-bold text-xl">Welcome, Admin</h4>
			</div>

			<div>
				<InputFeature type="date" />
			</div>
		</div>

		<div class="mt-4">
			<div class="grid grid-cols-4 gap-4">
				<div
                    v-for="(summary, i) in summaries"
                    :key="i"
                >
					<SummaryBox :summary="summary" />
				</div>
			</div>
		</div>
	</div>
</template>
<script lang="ts" setup>
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
