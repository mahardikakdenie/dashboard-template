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
			<div class="gap-3 flex">
				<button
					class="border border-green-300 bg-green-400 px-4 rounded text-gray-100 py-1 text-sm hover:bg-green-500 cursor-pointer font-semibold">
					Create Data
				</button>
				<button
					class="border border-green-300 bg-green-400 px-4 rounded text-gray-100 py-1 text-sm hover:bg-green-500 cursor-pointer font-semibold">
					Filter
				</button>
			</div>
		</div>
		<table class="min-w-full divide-y divide-gray-200 rounded-xl shadow">
			<thead class="bg-gray-50">
				<tr>
					<th>
						<BaseCheckbox />
					</th>
					<th
						v-for="thead in theadCompanies"
						:key="thead.key"
						scope="col"
						class="px-6 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">
						{{ thead.name }}
					</th>
				</tr>
			</thead>

			<transition name="fade" mode="out-in">
				<tbody>
					<tr v-for="(data, index) in paginatedData" :key="index">
						<td>
							<BaseCheckbox />
						</td>
						<td
							v-for="(i, key) in data"
							:key="key"
							class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
							<span>
								{{ data[key] }}
							</span>
						</td>
					</tr>
					<tr v-if="!paginatedData || (paginatedData && paginatedData.length === 0)">
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
			<div class="flex space-x-1">
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
					{{ page }}
				</button>
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
	{}
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
	}
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
