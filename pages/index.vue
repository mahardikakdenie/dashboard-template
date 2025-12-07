<template>
	<div>
		<div class="flex justify-between gap-4">
			<div class="flex items-center">
				<h4 class="font-bold text-xl">Welcome, {{ currentUser?.email }}</h4>
			</div>

			<div>
				<button class="px-5 py-2 bg-white text-sm font-medium text-gray-700 border cursor-pointer border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200">
                    Filter Date
                </button>
			</div>
		</div>

		<div class="mt-4">
			<div class="grid grid-cols-4 gap-4">
				<div v-for="(summary, i) in summaries" :key="i">
					<SummaryBox :summary="summary" />
				</div>
			</div>
		</div>

		<div v-for="i in 3" :key="i" class="mt-4 overflow-hidden rounded-lg shadow bg-white p-4">
            <div class="flex justify-between my-4">
                <div>
                    <span class="font-bold text-slate-500">Companies Data</span>
                </div>
                <div>
                    <button class="border border-green-300 bg-green-400 px-4 rounded text-gray-100 py-1 text-sm hover:bg-green-500 cursor-pointer font-semibold">
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
				<tbody class="bg-white divide-y divide-gray-200">
					<tr class="hover:bg-gray-50 transition-colors duration-150">
                        <td>
                            <label class="flex justify-center items-center">
                                <input type="checkbox" class="form-checkbox h-4 w-4 cursor-pointer text-indigo-600 rounded" />
                            </label>
                        </td>
						<td
							class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
							Adrian Herman
						</td>
						<td
							class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
							Admin Analist
						</td>
						<td
							class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
							28
						</td>
						<td
							class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
							Jakarta
						</td>
					</tr>
					<tr class="hover:bg-gray-50 transition-colors duration-150">
                        <td>
                            <label class="flex justify-center items-center">
                                <input type="checkbox" class="form-checkbox h-4 w-4 cursor-pointer text-indigo-600 rounded" />
                            </label>
                        </td>
						<td
							class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
							Budi Santoso
						</td>
						<td
							class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
							Developer
						</td>
						<td
							class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
							32
						</td>
						<td
							class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
							Bandung
						</td>
					</tr>
					<tr class="hover:bg-gray-50 transition-colors duration-150">
                        <td class="">
                            <label class="flex items-center justify-center">
                                <input type="checkbox" class="form-checkbox h-4 w-4 cursor-pointer text-indigo-600 rounded" />
                            </label>
                        </td>
						<td
							class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
							Siti Rahayu
						</td>
						<td
							class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
							Marketing
						</td>
						<td
							class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
							25
						</td>
						<td
							class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
							Surabaya
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>
<script lang="ts" setup>
import buildingIcon from '~/components/icons/building.vue';
import carouselVerticalIcon from '~/components/icons/carousel-vertical.vue';
import chalkboardIcon from '~/components/icons/chalkboard.vue';
import bussinesPlanIcon from '~/components/icons/bussines-plan.vue';
import { useUserStore } from '~/store/users';

export interface Summary {
	name: string;
	value: number;
	percentage: number;
	icon: any;
}

const userStore = useUserStore();

const currentUser =  computed(() => userStore.me);

const token = useCookie('auth_token');

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

const theadCompanies = ref<{
    name: string;
    key: string;
}[]>([
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

const companySummary = ref({
	total: 0,
	active: 0,
	inactive: 0,
	pending: 0,
	new: 0,
});
const getDataSummary = async () => {
	try {
		const response: {totalCompany: number; active: number} = await $fetch("/api/companies/summary", {
			headers: {
				Authorization: `Bearer ${token.value}`
			}
		});

		console.log("response : ", response);

		summaries.value[0].value = response?.totalCompany ?? 0;
		summaries.value[1].value = response?.active ?? 0;
		
	} catch (error) {
		console.log("error fetch company summary : ",error);
		
	}
};

onMounted(() => {
	getDataSummary();
});
</script>
