<script lang="ts" setup>
import type { TableColumn } from '~/components/ui/Table.vue';
import usePostHook from '~/hooks/themes/pos/pos.hooks';
import type { ThemeResult, ThemeSummaryResp } from '~/types/themes.types';

const headers = reactive<TableColumn[]>([
	{
		label: 'Name Theme',
		key: 'themes.name',
		type: 'text',
	},
	{
		label: 'Status',
		key: 'status',
		type: 'text',
	},
	{
		label: 'Author',
		key: 'author',
		type: 'text',
	},
	{
		label: 'Created At',
		key: 'created_at',
		type: 'text',
	},
	{
		label: 'Actions',
		key: 'actions',
		type: 'actions',
		align: "center"
	},
]);

const { tabs, currentTabs } = usePostHook();

const themes = ref<ThemeResult[]>([]);
const summary = ref<ThemeSummaryResp>({
	all: 0,
});
const isLoading = ref<boolean>(true);
const isSummaryLoading = ref<boolean>(true);

// Modal State
const isOpenModal = ref<boolean>(false);

/**
 * Get Data Themes
 */
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

/**
 * Get data summary themes
 */
const getDataSummary = async () => {
	try {
		const fetchSummary = await $fetch<ThemeSummaryResp>(
			'/api/themes/summaries'
		);
		isSummaryLoading.value = false;
		summary.value = fetchSummary;
	} catch (error) {
		console.log('error summary', error);
		isSummaryLoading.value = false;
	}
};

/**
 * Create new theme
 */
const onCreateTheme = async (formData: { name: string; status: string; imageUrl: string }) => {
	try {
		const body = {
			name: formData.name,
			status: formData.status,
			image: formData.imageUrl,
			author: 'Mahardika'
		}
		const response = await $fetch('/api/themes', {
			method: 'POST',
			body: body,
		});
		console.log('Theme created successfully:', response);
		isOpenModal.value = false;
		await getDataThemes();
		await getDataSummary();
	} catch (error) {
		console.error('Error creating theme:', error);
	}

};

onMounted(async () => {
	await getDataThemes();
	await getDataSummary();
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
			<themes-pos-theme-summary
				:summary="summary"
				v-if="currentTabs === 'table' && !isSummaryLoading" />
			<UiTable
				v-if="currentTabs === 'table'"
				:is-loading="isLoading"
				:show-title="false"
				:datas="themes"
				:headers="headers"
				@open-modal-create="isOpenModal = !isOpenModal" />
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
							class="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300" />
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

		<!-- Modal Create Themes -->
		<ThemesPosThemeModalCreate
			v-if="isOpenModal"
			@on-close-modal="isOpenModal = !isOpenModal" @submit="onCreateTheme" />
	</div>
</template>
