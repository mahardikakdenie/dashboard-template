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
			<div>
				<button
					class="border border-green-300 bg-green-400 px-4 rounded text-gray-100 py-1 text-sm hover:bg-green-500 cursor-pointer font-semibold">
					Lihat Semua Data
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
					<tr>
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
	</div>
</template>

<script lang="ts" setup>
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
		name: 'PLAN',
		key: 'plan',
	},
	{
		name: 'Status',
		key: 'status',
	},
]);
</script>
