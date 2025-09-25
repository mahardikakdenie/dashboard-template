<template>
	<div class="flex h-screen bg-gray-100">
		<!-- Sidebar -->
		<aside
			:class="{
				'translate-x-0': isSidebarOpen,
				'-translate-x-full': !isSidebarOpen,
			}"
			class="fixed inset-y-0 left-0 z-30 w-64 transition transform ease-in-out duration-200 bg-white lg:translate-x-0 lg:static lg:inset-auto">
			<!-- <Sidebar /> -->
			<SidebarTwoColumn />
		</aside>

		<!-- Main Content Area -->
		<div class="flex flex-col flex-1 overflow-hidden relative">
			<!-- Navbar -->
			<header class="bg-white z-20">
				<Navbar @toggle-sidebar="toggleSidebar" />
			</header>

			<!-- Page Content -->
			<main class="flex-1 overflow-y-auto bg-gray-100 p-6">
				<div v-if="$route?.fullPath !=='/'" class="flex justify-between gap-4">
					<div class="flex items-center">
						<h4 class="font-bold text-xl capitalize">
							{{ title }}
						</h4>
					</div>

					<div v-if="!$route.fullPath.includes('create')">
						<button
							class="px-5 py-2 bg-white text-sm font-medium text-gray-700 border cursor-pointer border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200">
							Filter Date
						</button>
					</div>
				</div>
				<nuxt-page />
			</main>

      <Footer />
		</div>
	</div>
</template>

<script setup lang="ts">
const META_DESCRIPTION: string = `👋 Hi. My name is Mahardika Kessuma Denie.
A Software Developer From Bandung
I've been working in software engineering for more than 3 years. I have good knowledge of frontend and backend.
I always try my best when building or developing software, so I always keep my code as tidy as possible and refactor periodically. I prefer to break my code into smaller chunks so it's easier to read. My skillset includes:`;

const TITLE = 'Dashboard Template - Mahardika Kessuma Denie';

useSeoMeta({
	title: TITLE,
	ogTitle: TITLE,
	description: META_DESCRIPTION,
	ogDescription: META_DESCRIPTION,
});

const route = useRoute();

const isSidebarOpen = ref(false);

const toggleSidebar = () => {
	isSidebarOpen.value = !isSidebarOpen.value;
};
const title = computed((): string => {
	if (typeof route?.params?.slug === 'object') {
		return route?.params?.slug[0].split('-').join(' ');
	} else {
    return route?.params?.slug?.replace('-', ' ');
	}

	return '';
});
</script>
