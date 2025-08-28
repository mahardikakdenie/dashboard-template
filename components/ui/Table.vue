<template>
	<div>
		<div>
			<span class="font-bold text-slate-500 capitalize"
				>{{ formattedCapitalize($route?.params?.slug) }} Data</span
			>
		</div>
		<div class="flex justify-between my-4">
			<div>
				<InputFeature placeholder="Search" />
			</div>
			<div class="flex flex-wrap items-center gap-4">
				<!-- Create Data Button -->
				<button
					class="flex items-center justify-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-slate-600 border border-slate-700 rounded-md shadow-sm hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 transition-all duration-200">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="w-4 h-4"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M12 4v16m8-8H4" />
					</svg>
					Create Data
				</button>

				<!-- Filter Button -->
				<button
					class="flex items-center justify-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-slate-500 border border-slate-600 rounded-md shadow-sm hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-400 transition-all duration-200">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="w-4 h-4"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707v5.172a1 1 0 01-.293.707l-2 2a1 1 0 01-1.414 0l-2-2a1 1 0 01-.293-.707v-5.172a1 1 0 00-.293-.707L3.293 5.293A1 1 0 013 4.586V4z" />
					</svg>
					Filter
				</button>
			</div>
		</div>
		<table class="min-w-full divide-y divide-gray-200 rounded-xl shadow">
			<thead class="bg-gray-50">
				<tr>
					<th>
						<BaseCheckbox :checked="false" />
					</th>
					<th
						v-for="thead in headers"
						:key="thead.key"
						scope="col"
						class="px-6 py-3 text-left text-xs font-bold text-slate-500 capitalize tracking-wider">
						{{ thead.name }}
					</th>
				</tr>
			</thead>

			<transition name="fade" mode="out-in">
				<tbody>
					<tr v-for="(data, index) in paginatedData" :key="index">
						<td>
							<BaseCheckbox :checked="false" />
						</td>
						<td
							v-for="([key, value], idx) in Object.entries(data)"
							:key="key"
							class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
							<div v-if="key === 'actions'">
								<div class="flex items-center space-x-2">
									<button
										class="text-blue-600 hover:text-blue-800"
										@click="$emit('delete', data)">
										<IconsTrash
											class="w-4 h-4 text-red-500" />
									</button>
									<button
										class="text-red-600 hover:text-red-800"
										@click="$emit('update', data)">
										<IconsUpdate
											class="w-4 h-4 text-blue-500" />
									</button>
								</div>
							</div>
							<div v-else-if="key === 'status'">
								<span
									class="px-2 py-1 rounded-full text-xs font-semibold"
									:class="{
										'bg-green-100 text-green-800':
											value === 'Active',
										'bg-red-100 text-red-800':
											value === 'Inactive',
										'bg-yellow-100 text-yellow-800':
											value === 'Pending',
									}">
									{{ value }}
								</span>
							</div>
							<span v-else>
								{{ value }}
							</span>
						</td>
					</tr>
					<tr
						v-if="
							!paginatedData ||
							(paginatedData && paginatedData.length === 0)
						">
						<td colspan="6" class="py-10 text-center space-y-3">
							<div class="flex justify-center">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="h-10 w-10 text-slate-400"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor">
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
								</svg>
							</div>
							<p class="text-lg font-semibold text-slate-700">
								Data tidak tersedia
							</p>
							<p class="text-sm text-slate-500">
								Silakan tambahkan data atau coba ubah filter
								pencarian.
							</p>
						</td>
					</tr>
				</tbody>
			</transition>
		</table>

		<!-- Pagination -->
		<div class="flex items-center justify-end gap-4 mt-6">
			<!-- Tombol Previous -->
			<button
				@click="prevPage"
				:disabled="currentPage === 1"
				class="px-4 py-2 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition">
				Previous
			</button>

			<!-- List Halaman -->
			<div v-if="pages.length > 0" class="flex space-x-1">
				<button
					v-for="page in pages"
					:key="page"
					@click="goToPage(page)"
					:class="[
						'px-3 py-1 rounded-md text-sm font-medium transition',
						currentPage === page
							? 'bg-blue-600 text-white'
							: 'bg-gray-100 text-gray-700 hover:bg-gray-200',
					]">
					{{ page || 0 }}
				</button>
			</div>

			<div v-else>
				<span
					class="px-3 py-1 rounded-md text-sm font-medium transition">
					0
				</span>
			</div>

			<!-- Tombol Next -->
			<button
				@click="nextPage"
				:disabled="currentPage === totalPages"
				class="px-4 py-2 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition">
				Next
			</button>
		</div>
	</div>
</template>

<script lang="ts" setup>
interface Header {
	name: string;
	key: string;
}

const props = withDefaults(
	defineProps<{
		headers?: Header[];
		datas?: any[];
	}>(),
	{
		headers: () => [
			{
				name: 'Company Name',
				key: 'name',
			},
			{
				name: 'Email',
				key: 'email',
			},
			{
				name: 'Account URL',
				key: 'url',
			},
			{
				name: 'Status',
				key: 'status',
			},
			{
				name: 'Actions',
				key: 'actions',
			},
		],
	}
);

const theadCompanies = ref<
	{
		name: string;
		key: string;
	}[]
>([
	{
		name: 'Company Name',
		key: 'name',
	},
	{
		name: 'Email',
		key: 'email',
	},
	{
		name: 'Account URL',
		key: 'url',
	},
	{
		name: 'Status',
		key: 'status',
	},
	{
		name: 'Actions',
		key: 'actions',
	},
]);

const currentPage = ref(1);
const itemsPerPage = 5;

// Hitung data untuk halaman saat ini
const paginatedData = computed(() => {
	const start = (currentPage.value - 1) * itemsPerPage;
	const end = start + itemsPerPage;
	return props?.datas?.slice(start, end);
});

// Tampilkan maksimal 5 tombol halaman
const pages = computed(() => {
	const total = totalPages.value;
	const current = currentPage.value;
	const range = [];

	if (total <= 5) {
		for (let i = 1; i <= total; i++) range.push(i);
	} else {
		if (current <= 3) {
			for (let i = 1; i <= 5; i++) range.push(i);
			range.push('...');
		} else if (current >= total - 2) {
			range.push('...');
			for (let i = total - 4; i <= total; i++) range.push(i);
		} else {
			range.push('...');
			for (let i = current - 1; i <= current + 1; i++) range.push(i);
			range.push('...');
		}
	}

	return range;
});

function goToPage(page: any) {
	if (typeof page === 'number') currentPage.value = page;
}

// Total halaman
const totalPages = computed(() =>
	Math.ceil((props?.datas?.length || 0) / itemsPerPage)
);

// Fungsi navigasi
function prevPage() {
	if (currentPage.value > 1) currentPage.value--;
}

function nextPage() {
	if (currentPage.value < totalPages.value) currentPage.value++;
}
</script>
