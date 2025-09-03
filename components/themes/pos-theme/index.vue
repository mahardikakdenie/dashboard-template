<script lang="ts" setup>
import usePostHook from '~/hooks/themes/pos/pos.hooks';
import type { ThemeResult } from '~/types/themes.types';

const headers = [
	{
		name: 'Name Theme',
		key: 'name_theme',
	},
	{
		name: 'Author',
		key: 'author',
	},
	{
		name: 'Created At',
		key: 'created_at',
	},
	{
		name: 'Actions',
		key: 'actions',
	},
];

const { tabs, currentTabs } = usePostHook();

const themes = ref<ThemeResult[]>([]);
const isLoading = ref<boolean>(true);
const getDataThemes = async () => {
	isLoading.value = true;
	try {
		const fetchedThemes = await $fetch<ThemeResult[]>('/api/themes');
		isLoading.value = false;

		themes.value = fetchedThemes;
	} catch (error) {
		isLoading.value = false;
	}
};

onMounted(async () => {
	await getDataThemes();
});
</script>

<template>
	<div>
		<!-- Tabbing -->
		<div
			class="p-2 rounded-xl bg-white shadow-sm border border-slate-200 flex space-x-1">
			<div
				v-for="tab in tabs"
				:key="tab.key"
				@click="currentTabs = tab.key"
				:class="[
					'px-5 py-2 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer',
					currentTabs === tab.key
						? 'bg-blue-100 text-blue-700 shadow-sm'
						: 'text-slate-500 hover:text-slate-700 hover:bg-slate-100',
				]">
				{{ $t(tab.name) }}
			</div>
		</div>
		<!-- End Tabbing -->

		<div>
			<UsersSummary v-if="currentTabs === 'table'" />
			<UiTable
				v-if="currentTabs === 'table'"
				:is-loading="isLoading"
				:show-title="false"
				:datas="themes"
				:headers="headers" />
			<div
				v-if="currentTabs === 'box'"
				class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
				<div
					v-for="(theme, i) in themes"
					:key="i"
					class="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden group">
					<div class="aspect-video overflow-hidden">
						<img
							:src="theme?.themes.image"
							alt="Theme Preview"
							class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
					</div>
					<div class="p-4">
						<h3 class="text-sm font-semibold text-slate-800">
							{{ theme?.themes.name ?? '-' }}
						</h3>
						<p class="text-xs text-slate-500 mt-1">
							by {{ theme?.author ?? '-' }}
						</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
