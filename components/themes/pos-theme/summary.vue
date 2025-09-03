
<script setup lang="ts">
import buildingIcon from '~/components/icons/building.vue';
import type { ThemeSummary, ThemeSummaryResp } from '~/types/themes.types';

const props = defineProps<{
    summary: ThemeSummaryResp
}>();

const summaries = ref<ThemeSummary[]>([
	{
		name: 'Total Themes',
		value: 0,
		percentage: 20,
		icon: markRaw(buildingIcon),
	},
]);

onMounted(() => {
    if (props.summary) {
        summaries.value[0].value = props.summary.all;
    }
});
</script>


<template>
	<div class="mt-4">
		<div class="grid sm:grid-cols-2 md:grid-cols-4 grid-cols-1 gap-4">
			<div v-for="(summary, i) in summaries" :key="i">
				<SummaryBox :summary="summary" />
			</div>
		</div>
	</div>
</template>
