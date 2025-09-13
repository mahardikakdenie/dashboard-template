<template>
	<aside class="h-full bg-white shadow-md">
		<div class="grid grid-cols-4 h-full">
			<!-- Sidebar Navigation - border-r border-gray-200  -->
			<div class="px-1 py-2 shadow">
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
			<div class="col-span-3 bg-gray-50 relative">
				<!-- Top Header -->
				<div
					class="px-6 py-5 border-gray-200 flex items-center justify-between bg-white">
					<!-- Logo -->
					<div class="flex items-center space-x-2">
						<img
							src="https://ensiklotari.id/_nuxt/img/logo.ee6db58.png"
							width="120"
							alt="Logo"
							class="object-contain" />
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
					<div
						class="px-4 py-2 border border-gray-200 rounded-lg bg-white shadow-sm flex flex-col items-center">
						<div class="mb-3">
							<img
								src="https://dreamspos.dreamstechnologies.com/html/template/assets/img/customer/customer15.jpg "
								alt="User Avatar"
								class="w-16 h-16 object-cover rounded-full border-2 border-indigo-100 shadow-sm" />
						</div>
						<h3
							class="text-sm font-semibold text-gray-800 text-center">
							{{ profile.name || 'Loading...' }}
						</h3>
						<p class="text-xs text-gray-500 mt-1">{{ profile.role ?? 'Author Website' }}</p>
					</div>
				</div>

				<!-- Navigation -->
				<nav
					class="flex-1 space-y-1 overflow-y-auto relative pt-4 pb-16">
					<Transition name="slide-top" appear>
						<div class="pl-2 py-1">
							<small
								class="font-semibold text-gray-500 text-xs"
								>{{ selectedBar.name }}</small
							>
						</div>
					</Transition>

					<TransitionGroup
						name="list"
						tag="div"
						class="space-y-1 relative">
						<div
							v-for="item in selectedBar.child?.filter(
								(child) => child?.url !== ''
							) || []"
							:key="item.name"
							class="group flex items-center px-3 py-2 text-sm font-medium rounded-md cursor-pointer"
							:class="{
								'bg-indigo-50 text-indigo-600':
									item.url === $route.fullPath,
								'text-gray-600 hover:bg-gray-100':
									item.url !== $route.fullPath,
							}"
							@click="onNavigate(item)">
							<div v-if="item.url" class="flex">
								<component
									v-if="item.icon"
									:is="item.icon"
									class="w-4 h-4" />
								<span
									class="ml-2 text-xs"
									:class="{
										'font-bold':
											item.url === $route.fullPath,
									}"
									>{{ item.name }}</span
								>
							</div>
						</div>

						<!-- Nested Children with Toggle -->
						<div
							v-for="childItem in selectedBar.child || []"
							:key="'sub-' + childItem.name">
							<div
								v-if="
									childItem.children &&
									childItem.children.length > 0
								">
								<div
									class="flex items-center justify-between w-full px-3 py-2 text-sm font-medium rounded-md cursor-pointer hover:bg-gray-100 group"
									@click="toggleDropdown(childItem.name)">
									<div class="flex items-center">
										<component
											v-if="childItem.icon"
											:is="childItem.icon"
											class="w-4 h-4" />
										<span
											class="ml-2 text-xs text-slate-500"
											>{{ childItem.name }}</span
										>
									</div>
									<IconsChevron
										:class="{
											'transform rotate-270': !isOpen(
												childItem.name
											),
											'transform rotate-0': isOpen(
												childItem.name
											),
										}" />
								</div>

								<!-- Submenu -->
								<Transition name="slide">
									<div
										v-show="isOpen(childItem.name)"
										class="pl-6 overflow-hidden">
										<div
											v-for="subItem in childItem.children"
											:key="'sub-' + subItem.name"
											class="px-3 py-2 text-sm text-gray-600 rounded-md cursor-pointer hover:bg-gray-100"
											:class="{
												'bg-indigo-50 text-indigo-600':
													subItem.url ===
													$route.fullPath,
											}"
											@click="$router.push(subItem.url)">
											<span class="ml-2 text-xs">{{
												subItem.name
											}}</span>
										</div>
									</div>
								</Transition>
							</div>
						</div>
					</TransitionGroup>
				</nav>

				<!-- Footer Area - Logout Button -->
				<div class="flex p-4 border-t absolute bottom-0 border-gray-200 w-full">
					<button
						@click="logout"
						class="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-red-600 font-medium text-sm transition-all duration-200 cursor-pointer hover:shadow">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							class="w-4 h-4">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
						</svg>
						<span>Logout</span>
					</button>
				</div>
			</div>
		</div>
	</aside>
</template>
<script setup lang="ts">
import { markRaw, ref } from 'vue';
import { MenuSidebar } from '~/constants/menus';
import { useUserStore } from '~/store/users';
import type { ChildMenus, Menus } from '~/types/Menus';
import type { User } from '~/types/user.type';

const router = useRouter();
const userStore = useUserStore();
const profile = ref<User>({} as User);

// Simpan status open/close dropdown berdasarkan nama menu
const openMenus = ref<any>({});

const toggleDropdown = (name: any) => {
	openMenus.value = {
		...openMenus.value,
		[name]: !openMenus.value[name],
	};
};

const isOpen = (name: any) => {
	return openMenus.value[name] || false;
};

const navItems = ref<Menus[]>(MenuSidebar);
const selectedBar = ref<Menus>(navItems.value[0]);
const isSidebarOpen = ref(false);

const toggleSidebar = () => {
	isSidebarOpen.value = !isSidebarOpen.value;
};

const route = useRoute();

// Auto-buka dropdown jika salah satu children aktif
const autoOpenDropdowns = () => {
	const openState = {} as Record<string, boolean>;
	selectedBar.value.child?.forEach((item) => {
		if (
			item.children &&
			item.children.some((child) => child.url === route.fullPath)
		) {
			openState[item.name] = true;
		}
	});
	return openState;
};

const onNavigate = (item: ChildMenus) => {
	if (item.isBlank) {
		window.open(item.url, '_blank');
	} else {
		router.push(item.url);
	}
};

const logout = async () => {
  try {
    // Panggil endpoint logout
    await $fetch('/api/logout', {
      method: 'POST',
    });

    // Hapus token juga di client (jaga-jaga)
    const token = useCookie('auth_token');
    token.value = null;

    // Redirect ke login
    await navigateTo('/auth/login', { replace: true });
  } catch (error) {
    console.error('Logout gagal:', error);
    // Tetap redirect ke login meskipun error
    await navigateTo('/login', { replace: true });
  }
};

const getDataProfile = async () => {
	try {
		const token = useCookie('auth_token');
		
		const profileAuth = await $fetch('/api/me', {
			headers: {
				Authorization: `Bearer ${token.value}`,
			},
		});

		// Convert created_at to Date object
		const userData = { ...profileAuth.data, created_at: new Date(profileAuth.data.created_at) };
		profile.value = userData;
		userStore.setAuthMe(profile.value);
	} catch (error) {
		console.error('Error fetching profile:', error);
	}
};

onMounted(() => {	
	getDataProfile();
	const data = navItems?.value?.filter((nav) =>
		nav?.child.some(
			(c) =>
				c.url === route?.fullPath ||
				c.children?.some((child) => child?.url === route?.fullPath)
		)
	);

	if (data.length > 0) {
		selectedBar.value = data[0];
	}

	// Set openMenus berdasarkan route aktif
	openMenus.value = autoOpenDropdowns();
});

// Responsif saat route berubah
watchEffect(() => {
	openMenus.value = autoOpenDropdowns();
});
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

.slide-enter-active,
.slide-leave-active {
	transition: all 0.2s ease-in-out;
	max-height: 200px;
	overflow: hidden;
}

.slide-enter-from,
.slide-leave-to {
	opacity: 0;
	max-height: 0;
}
</style>
