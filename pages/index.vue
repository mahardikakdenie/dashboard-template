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
								+{{summary.percentage}}%
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
			</div>
		</div>
	</div>
</template>
<script lang="ts" setup>
import buildingIcon from '~/components/icons/building.vue';
import carouselVerticalIcon from '~/components/icons/carousel-vertical.vue';
import chalkboardIcon from '~/components/icons/chalkboard.vue';
import bussinesPlanIcon from '~/components/icons/bussines-plan.vue';

interface Summary {
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
