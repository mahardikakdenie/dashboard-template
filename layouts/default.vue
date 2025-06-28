<template>
  <div class="flex h-screen bg-gray-100">
    <!-- Sidebar -->
    <aside
      :class="{ 'translate-x-0': isSidebarOpen, '-translate-x-full': !isSidebarOpen }"
      class="fixed inset-y-0 left-0 z-30 w-64 transition transform ease-in-out duration-200 bg-white lg:translate-x-0 lg:static lg:inset-auto"
    >
      <!-- <Sidebar /> -->
       <SidebarTwoColumn />
    </aside>

    <!-- Main Content Area -->
    <div class="flex flex-col flex-1 overflow-hidden">
      <!-- Navbar -->
      <header class="bg-white z-20">
        <Navbar @toggle-sidebar="toggleSidebar" />
      </header>

      <!-- Page Content -->
      <main class="flex-1 overflow-y-auto bg-gray-100 p-6">
        <nuxt-page />
      </main>
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

const isSidebarOpen = ref(false)

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value
}
</script>
