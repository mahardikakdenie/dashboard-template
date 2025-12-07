<template>
	<aside class="h-full bg-white shadow-md">
		<div class="grid grid-cols-4 h-full">
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

			<div class="col-span-3 bg-gray-50 relative">
				<div
					class="px-6 py-5 border-gray-200 flex items-center justify-between bg-white">
					<div class="flex items-center space-x-2">
						<img
							src="https://ensiklotari.id/_nuxt/img/logo.ee6db58.png"
							width="120"
							alt="Logo"
							class="object-contain" />
					</div>

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

				<div class="px-4 mt-4">
					<div
						class="px-5 py-4 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col items-center">
						<div
							v-if="!profile"
							class="flex flex-col items-center animate-pulse">
							<div
								class="w-16 h-16 rounded-full bg-gray-200 mb-3"></div>
							<div
								class="h-4 bg-gray-200 rounded w-24 mb-1"></div>
							<div class="h-3 bg-gray-200 rounded w-16"></div>
						</div>
						<template v-else>
							<div class="mb-3">
								<img
									src="https://dreamspos.dreamstechnologies.com/html/template/assets/img/customer/customer15.jpg"
									alt="User profile"
									class="w-16 h-16 rounded-full object-cover border-2 border-indigo-50/30 shadow-sm transition-transform duration-200 hover:scale-105"
									loading="lazy" />
							</div>
							<span
								class="text-base font-semibold text-gray-800 text-center line-clamp-1">
								{{
									profile.email?.split('@')[0] || 'Loading...'
								}}
							</span>
							<p class="text-sm text-gray-500 mt-1 text-center">
								{{
									profile.role?.name || 'Website Contributor'
								}}
							</p>
						</template>
					</div>
				</div>

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
							<div v-if="item.url" class="flex items-center">
								<component
									v-if="item.icon"
									:is="item.icon"
									class="w-4 h-4" />
								<span
									class="ml-2 text-xs"
									:class="{
										'font-bold':
											item.url === $route.fullPath,
									}">
									{{ item.name }}
								</span>
							</div>
						</div>

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

				<div
					class="flex p-4 border-t absolute bottom-0 border-gray-200 w-full">
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
import { ref, onMounted, watchEffect } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useUserStore } from '~/store/users';
import { MenuSidebar } from '~/constants/menus';
import type { Menus, ChildMenus } from '~/types/Menus';
import type { User } from '~/types/user.type';

const router = useRouter();
const route = useRoute();
const userStore = useUserStore();
const profile = ref<User | null>(null);
const openMenus = ref<Record<string, boolean>>({});
const navItems = ref<Menus[]>(MenuSidebar);
const selectedBar = ref<Menus>(navItems.value[0]);
const isSidebarOpen = ref(false);

const toggleDropdown = (name: string) => {
	openMenus.value = { ...openMenus.value, [name]: !openMenus.value[name] };
};

const isOpen = (name: string) => openMenus.value[name] || false;

const toggleSidebar = () => {
	isSidebarOpen.value = !isSidebarOpen.value;
};

const autoOpenDropdowns = () => {
	const openState = {} as Record<string, boolean>;
	selectedBar.value.child?.forEach((item) => {
		if (item.children?.some((child) => child.url === route.fullPath)) {
			openState[item.name] = true;
		}
	});
	return openState;
};

const onNavigate = (item: ChildMenus) => {
	if (item.isBlank) return window.open(item.url, '_blank');
	router.push(item.url);
};

const logout = async () => {
	try {
		await $fetch('/api/logout', { method: 'POST' });
		const token = useCookie('auth_token');
		token.value = null;
		await navigateTo('/auth/login', { replace: true });
	} catch (error) {
		console.error('Logout gagal:', error);
	}
};

const getDataProfile = async () => {
	const token = useCookie('auth_token');
	if (!token.value) return navigateTo('/auth/login', { replace: true });

	try {
		const profileAuth = await $fetch('/api/me', {
			headers: { Authorization: `Bearer ${userStore.token}` },
		});
		const userData = {
			...profileAuth.data,
			created_at: new Date(profileAuth.data.created_at as string),
		};
		profile.value = userData as User;
		userStore.setAuthMe(userData as User);
	} catch (error) {
		console.error('Error fetching profile:', error);
		navigateTo('/auth/login', { replace: true });
	}
};

onMounted(() => {
	getDataProfile();
	const matched = navItems.value.filter((nav) =>
		nav.child.some(
			(c) =>
				c.url === route.fullPath ||
				c.children?.some((child) => child.url === route.fullPath)
		)
	);
	if (matched.length > 0) selectedBar.value = matched[0];
	openMenus.value = autoOpenDropdowns();
});

watchEffect(() => {
	openMenus.value = autoOpenDropdowns();
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
	opacity: 0;
}

.slide-fade-enter-active,
.slide-fade-leave-active {
	transition: all 0.3s ease;
}
.slide-fade-enter-from,
.slide-fade-leave-to {
	opacity: 0;
	transform: translateY(10px);
}

.slide-top-enter-active {
	transition: all 0.3s ease;
}
.slide-top-enter-from {
	opacity: 0;
	transform: translateY(-10px);
}

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
