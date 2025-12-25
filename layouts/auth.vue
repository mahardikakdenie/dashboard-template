<template>
  <div
    class="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50 px-4 sm:px-6 lg:px-8">

    <!-- Card Container -->
    <div
      class="max-w-md w-full space-y-8 p-10 bg-white rounded-2xl shadow-xl transition-all duration-300 transform hover:scale-[1.01]">

      <!-- Logo / Judul -->
      <div class="text-center">
        <div class="flex justify-center mb-4">
          <IconsLock class="text-blue-600" />
        </div>

        <h2 class="mt-6 text-3xl font-extrabold text-gray-900">
          {{ title }}
        </h2>
        <p v-if="$slots.default" class="mt-2 text-sm text-gray-600">
          <slot name="description">Silakan masuk untuk melanjutkan</slot>
        </p>
      </div>

      <!-- Form Content -->
      <div class="mt-8">
        <Transition name="fade" mode="out-in">
          <NuxtPage />
        </Transition>
      </div>

      <!-- Optional Alternative Login -->
      <div class="mt-6">
        <div class="relative">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-gray-300"></div>
          </div>
          <div class="relative flex justify-center text-sm">
            <span class="px-2 bg-white text-gray-500">Atau lanjutkan dengan</span>
          </div>
        </div>

        <div class="mt-4 flex gap-3">
          <button @click="loginWith('google')"
            class="flex-1 py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center justify-center space-x-2">
            <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path
                d="M12.24 10.27c-.53-.31-1.2-.5-1.93-.5-2.35 0-4.26 1.54-4.26 4.27 0 .86.26 1.67.73 2.36.47.69 1.12 1.24 1.91 1.62.79.38 1.68.57 2.65.57 1.91 0 3.56-.67 4.95-2l-2.14-1.68c-.59.49-1.37.81-2.33.81-1.15 0-2.11-.39-2.87-1.17-.77-.78-1.15-1.75-1.15-2.91 0-1.15.38-2.11 1.15-2.88.77-.77 1.72-1.16 2.86-1.16.96 0 1.75.32 2.36.96.19.2.41.2.6.02l2.32-2.1c-.71-.97-1.73-1.74-3.04-2.31C9.9 3.27 8.33 3 6.9 3 4.15 3 1.9 4.44 1.9 6.65 1.9 8.36 3.05 9.75 4.75 10.3c.21.07.3.27.24.48l-.34 1.28c-.11.41-.37.64-.78.7-.2.03-.4-.07-.53-.25-.32-.41-.5-.88-.5-1.39 0-.38.08-.74.22-1.06.15-.33.35-.63.6-.89.25-.26.54-.48.86-.66.32-.18.66-.33 1.03-.44.37-.11.74-.17 1.11-.17.89 0 1.72.18 2.49.55.77.37 1.42.88 1.95 1.53.53.65.79 1.41.79 2.28 0 .94-.28 1.77-.85 2.51-.56.74-1.32 1.3-2.27 1.68-.95.39-1.95.59-3.01.59-2.06 0-3.82-.58-5.28-1.74L5.62 17c1.79 1.36 4.02 2.08 6.7 2.08 1.81 0 3.49-.36 5.04-1.08.88-.4 1.68-.94 2.39-1.62.71-.68 1.27-1.47 1.68-2.37.41-.9.62-1.87.62-2.91 0-1.04-.21-2.01-.62-2.91-.41-.9-1.01-1.69-1.8-2.37-.79-.68-1.69-1.22-2.7-1.62Z" />
            </svg>
            <span>Google</span>
          </button>

          <button @click="loginWith('facebook')"
            class="flex-1 py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center justify-center space-x-2">
            <svg class="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
            </svg>
            <span>Facebook</span>
          </button>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
const title = 'Selamat Datang';

const loginWith = (provider) => {
  alert(`Login with ${provider}`);
};
useSeoMeta({
  title: "Login Admin Template"
})
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
</style>
