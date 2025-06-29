<template>
    <aside class="h-full bg-white shadow-md">
        <div class="grid grid-cols-4 h-full">
            <!-- Sidebar Navigation -->
            <div class="border-r border-gray-200 px-1 py-2">
                <nav class="space-y-1">
                    <TransitionGroup name="slide-fade">
                        <div
                            v-for="item in navItems"
                            :key="item.name"
                            class="group flex flex-col items-center justify-center text-center p-3 text-sm font-medium rounded-md cursor-pointer transition-all duration-200"
                            :class="{
                                'bg-indigo-50 text-indigo-600':
                                    selectedBar.key === item.key,
                                'text-gray-600 hover:bg-gray-100':
                                    selectedBar.key !== item.key,
                            }"
                            @click="selectedBar = item">
                            <component :is="item.icon" class="w-5 h-4" />
                            <span class="text-[8px]">{{ item.name }}</span>
                        </div>
                    </TransitionGroup>
                </nav>
            </div>

            <!-- Main Header Area -->
            <div class="col-span-3 bg-gray-50">
                <!-- Top Header -->
                <div
                    class="px-6 py-5 border-b border-gray-200 flex items-center justify-between bg-white">
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
                        <svg
                            class="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24">
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <!-- Profile Card -->
                <div class="px-4 mt-4">
                    <Transition name="fade" appear>
                        <div
                            class="px-4 py-2 border border-gray-200 rounded-lg bg-white shadow-sm flex flex-col items-center">
                            <div class="mb-3">
                                <img
                                    src="https://dreamspos.dreamstechnologies.com/html/template/assets/img/customer/customer15.jpg "
                                    alt="User Avatar"
                                    class="w-16 h-16 object-cover rounded-full border-2 border-indigo-100 shadow-sm"
                                />
                            </div>
                            <h3
                                class="text-sm font-semibold text-gray-800 text-center">
                                Mahardika Kessuma Denie
                            </h3>
                            <p class="text-xs text-gray-500 mt-1">Author Website</p>
                        </div>
                    </Transition>
                </div>

                <!-- Navigation -->
                <nav class="flex-1 space-y-1 overflow-y-auto">
                    <Transition name="slide-top" appear>
                        <div class="pl-2 py-1">
                            <small class="font-semibold text-gray-500 text-xs">{{
                                selectedBar.name
                            }}</small>
                        </div>
                    </Transition>

                    <TransitionGroup name="list" tag="div" class="space-y-1">
                        <div
                            v-for="item in selectedBar.child || []"
                            :key="item.name"
                            class="group flex items-center px-3 py-2 text-sm font-medium rounded-md cursor-pointer"
                            :class="{
                                'bg-indigo-50 text-indigo-600':
                                    item.url === $route?.fullPath,
                                'text-gray-600 hover:bg-gray-100':
                                    item.url !== $route.fullPath,
                            }"
                            @click="$router.push(item.url)">
                            <component v-if="item.icon" :is="item.icon" class="w-4 h-4" />
                            <span
                                class="ml-2 text-xs"
                                :class="[
                                    { 'font-bold': item.url === $route?.fullPath },
                                ]"
                                >{{ item.name }}</span
                            >
                        </div>
                    </TransitionGroup>
                </nav>
            </div>
        </div>
    </aside>
</template>
<script setup lang="ts">
import IconReport from '../icons/report.vue';
import IconDashboard from '../icons/dashboard.vue';
import iconHome from '../icons/home.vue';
import IconProduct from '../icons/product.vue';
import IconOrder from '../icons/order.vue';
import theme from '../icons/theme.vue';
import starIcon from '../icons/star.vue';
import packagesIcon from '../icons/packages.vue';
import domainIcon from '../icons/domain.vue';
import purchaseIcon from '../icons/purchase.vue';
import truckIcon from '../icons/truck.vue';
import shoppingIcon from '../icons/shopping.vue';
import storeIcon from '../icons/store.vue';
import uxCircleIcon from '../icons/ux-circle.vue';
import alertIcon from '../icons/alert.vue';
import { markRaw, ref } from 'vue';

interface Menus {
	name: string;
	key: string;
	icon: any;
	roles?: string[];
	child: {
		name: string;
		url: string;
		icon?: any;
	}[];
}

const isHoverMouse = ref<boolean>(false);

const showNav = ref<boolean>(false);
const navItems: Menus[] = [
    {
        name: 'Dashboard',
        key: 'index',
        icon: markRaw(iconHome),
        roles: ['admin', 'superadmin'],
        child: [
            { name: 'Dashboard', icon: markRaw(IconDashboard), url: '/' },
            { name: 'Companies', icon: markRaw(theme), url: '/home/companies' },
            { name: 'Subcriptions', icon: markRaw(starIcon), url: '/home/subcription' },
            { name: 'Packages', icon: markRaw(packagesIcon), url: '/home/packages' },
            { name: 'Domain', icon: markRaw(domainIcon), url: '/home/domain' },
            { name: 'Purchase Transaction', icon: markRaw(purchaseIcon), url: '/home/purchase-transaction' },
        ],
    },
    {
        name: 'Orders',
        key: 'orders',
        icon: markRaw(IconOrder),
        child: [
            { name: 'Order Monitoring', icon: markRaw(truckIcon), url: '/order/monitoring' }
        ],
    },
    {
        name: 'Products',
        key: 'products',
        icon: markRaw(IconProduct),
        child: [
            { name: 'List Products', icon: markRaw(shoppingIcon), url: '/products/list' }
        ],
    },
    { 
        name: 'Reports', 
        key: 'reports', 
        icon: markRaw(IconReport), 
        child: [] 
    },
    { 
        name: 'Theme', 
        key: 'theme', 
        icon: markRaw(theme), 
        child: [
            { name: 'Theme Monitoring', icon: markRaw(storeIcon), url: '/theme/monitoring' }
        ] 
    },
    { 
        name: 'UI Interface', 
        key: 'ux-interface', 
        icon: markRaw(uxCircleIcon), 
        child: [
            { name: 'Alert UI', icon: markRaw(alertIcon), url: '/user-interface/alert' },
        ] 
    },
];
const selectedBar = ref<Menus>(navItems[0]);
const isSidebarOpen = ref(false);

const toggleSidebar = () => {
	isSidebarOpen.value = !isSidebarOpen.value;
};

const onMouseHover = () => {
	console.log('Mouse Hover');
};
</script>

<style>
/* Fade */
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

/* Slide Fade */
.slide-fade-enter-active,
.slide-fade-leave-active {
    transition: all 0.3s ease;
}
.slide-fade-enter-from,
.slide-fade-leave-to {
    opacity: 0;
    transform: translateY(10px);
}

/* Slide Top */
.slide-top-enter-active {
    transition: all 0.3s ease;
}
.slide-top-enter-from {
    opacity: 0;
    transform: translateY(-10px);
}

/* List Animation */
.list-enter-active,
.list-leave-active {
    transition: all 0.3s ease;
}
.list-enter-from,
.list-leave-to {
    opacity: 0;
    transform: translateX(-10px);
}
</style>
