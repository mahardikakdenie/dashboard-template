<template>
    <aside class="h-full bg-white shadow-md">
        <div class="grid grid-cols-4 h-full">
            <!-- Sidebar Navigation -->
            <div class="border-r border-gray-200 px-1 py-2">
                <nav class="space-y-1">
                    <div
                        v-for="item in navItems"
                        :key="item.name"
                        class="group flex items-center justify-center text-center p-3 text-sm font-medium rounded-md cursor-pointer transition-all duration-200"
                        :class="{
                            'bg-indigo-50 text-indigo-600': selectedBar.key === item.key,
                            'text-gray-600 hover:bg-gray-100': selectedBar.key !== item.key,
                        }"
                        @click="selectedBar = item">
                        <component :is="item.icon" class="w-5 h-5" />
                    </div>
                </nav>
            </div>

            <!-- Main Header Area -->
            <div class="col-span-3 bg-gray-50">
                <!-- Top Header -->
                <div class="px-6 py-5 border-b border-gray-200 flex items-center justify-between bg-white">
                    <!-- Logo -->
                    <div class="flex items-center space-x-2">
                        <img
                            src="https://dreamspos.dreamstechnologies.com/html/template/assets/img/logo.svg "
                            width="130"
                            alt="Logo"
                            class="object-contain"
                        />
                    </div>

                    <!-- Mobile Close Button -->
                    <button
                        @click="toggleSidebar"
                        class="lg:hidden p-2 rounded-md text-gray-500 hover:text-gray-700 focus:outline-none">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </div>

                <!-- Profile Card -->
                <div class="px-4 mt-4">
                    <div class="px-4 py-2 border border-gray-200 rounded-lg bg-white shadow-sm flex flex-col items-center">
                        <div class="mb-3">
                            <img
                                src="https://dreamspos.dreamstechnologies.com/html/template/assets/img/customer/customer15.jpg "
                                alt="User Avatar"
                                class="w-16 h-16 object-cover rounded-full border-2 border-indigo-100 shadow-sm"
                            >
                        </div>
                        <h3 class="text-sm font-semibold text-gray-800 text-center">Adrian Herman</h3>
                        <p class="text-xs text-gray-500 mt-1">Admin Analist</p>
                    </div>
                </div>

                <!-- Navigation -->
				<nav class="flex-1 space-y-1 overflow-y-auto">
					<div class="pl-2 py-1">
						<small class="font-semibold text-gray-500 text-xs">{{ selectedBar.name }}</small>
					</div>

					<div v-for="item in selectedBar.child || []" :key="item.name"
						class="group flex items-center px-3 py-2 text-sm font-medium rounded-md cursor-pointer" :class="{
							'bg-indigo-50 text-indigo-600':
								item.url === $route?.fullPath,
							'text-gray-600 hover:bg-gray-100':
								item.url !== $route.fullPath,
						}" @click="$router.push(item.url)">
						<span class="ml-2 text-xs" :class="[
                            {'font-bold': item.url === $route?.fullPath}
                        ]">{{ item.name }}</span>
					</div>
				</nav>	
            </div>
        </div>
    </aside>
</template>

<script setup lang="ts">
import IconReport from '../icons/report.vue';
import IconDashboard from '../icons/dashboard.vue';
import IconProduct from '../icons/product.vue';
import IconOrder from '../icons/order.vue';

interface Menus {
    name: string;
    key: string;
    icon: any;
    to: string;
    child: {
        name: string;
        url: string;
    }[]
}

const showNav = ref<boolean>(false);
const navItems: Menus[] = [
	{ name: 'Beranda', key: 'index', icon: IconDashboard, to: '/', child: [
        {
            name: 'Dashboard',
            url: '/',
        },
        {
            name: 'Companies',
            url: '/home/companies'
        },
        {
            name: 'Subcriptions',
            url: '',
        },
        {
            name: 'Packages',
            url: ''
        },
        {
            name: 'Domain',
            url: ''
        },
        {
            name: 'Purchase Transaction',
            url: ''
        }
    ] },
	{ name: 'Pesanan', key: 'orders', icon: IconOrder, to: '/orders', child: [] },
	{ name: 'Produk', key: 'products', icon: IconProduct, to: '/products', child: [] },
	{ name: 'Laporan', key: 'reports', icon: IconReport, to: '/reports', child: [] },
];

const selectedBar = ref<Menus>(navItems[0]);
const isSidebarOpen = ref(false);

const toggleSidebar = () => {
	isSidebarOpen.value = !isSidebarOpen.value;
};
</script>
