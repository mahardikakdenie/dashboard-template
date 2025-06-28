<template>
	<div class="flex h-screen bg-gray-50 text-gray-800">
		<!-- Sidebar -->
		<aside :class="{
			'translate-x-0': isSidebarOpen,
			'-translate-x-full': !isSidebarOpen,
		}" class="fixed inset-y-0 left-0 z-30 w-64 transition-all duration-300 ease-in-out bg-gray-50 lg:translate-x-0 lg:static lg:inset-auto">
			<div class="h-full flex flex-col">
				<!-- Logo -->
				<div class="flex items-center justify-between px-4 py-5 ">
					<div class="flex items-center space-x-2">
						<img src="https://dreamspos.dreamstechnologies.com/html/template/assets/img/logo.svg"
							width="130" alt="" />
					</div>
					<button class=" bg-white rounded-full p-0" @click="showNav = !showNav">
						<img v-if="showNav" src="https://cdn-icons-png.flaticon.com/512/9179/9179580.png" width="15"
							alt="">
						<img v-else src="https://cdn-icons-png.flaticon.com/512/565/565665.png" width="15" alt="">
					</button>

					<!-- Close Button (Mobile) -->
					<button @click="toggleSidebar" class="p-1 rounded-md text-gray-500 hover:text-gray-700 lg:hidden">
						<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
								d="M6 18L18 6M6 6l12 12" />
						</svg>
					</button>
				</div>
				<hr class="border-gray-200" />
				<!-- Navigation -->
				<nav class="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
					<div class="pl-2 py-1">
						<small class="font-semibold">Main</small>
					</div>

					<div v-for="item in navItems" :key="item.name"
						class="group flex items-center px-3 py-2 text-sm font-medium rounded-md cursor-pointer" :class="{
							'bg-indigo-50 text-indigo-600':
								item.key === $route?.name,
							'text-gray-600 hover:bg-gray-100':
								item.key !== $route.name,
						}" @click="$router.push(item.to)">
						<component :is="item.icon" />
						<span class="ml-2">{{ item.name }}</span>
					</div>
				</nav>	
			</div>
		</aside>
	</div>
</template>

<script setup lang="ts">
import IconReport from './icons/report.vue';
import IconDashboard from './icons/dashboard.vue';
import IconProduct from './icons/product.vue';
import IconOrder from './icons/order.vue';

const showNav = ref<boolean>(false);

const navItems = [
	{ name: 'Beranda', key: 'index', icon: IconDashboard, to: '/' },
	{ name: 'Pesanan', key: 'orders', icon: IconOrder, to: '/orders' },
	{ name: 'Produk', key: 'products', icon: IconProduct, to: '/products' },
	{ name: 'Laporan', key: 'reports', icon: IconReport, to: '/reports' },
];

const isSidebarOpen = ref(false);

const toggleSidebar = () => {
	isSidebarOpen.value = !isSidebarOpen.value;
};
</script>
