<script setup lang="ts">
definePageMeta({
  layout: 'auth',
});

// 👇 Import yang dibutuhkan
import { ref } from 'vue';
import { useCookie } from '#imports';
import { navigateTo } from '#imports';
import type { User } from '~/types/user.type';
import { useUserStore } from '~/store/users';

// 👇 State form
const email = ref('');
const password = ref('');
const loading = ref(false);
const error = ref<string | null>(null);

const {
  login: useChangeToken,
} = useAuth();

const authStore = useUserStore();

// 👇 Fungsi login
const login = async () => {
  error.value = null;
  loading.value = true;

  try {
    const res: {
      success: boolean;
      message: string;
      token?: string;
      user: User;
    } = await $fetch('/api/auth', {
      method: 'POST',
      body: {
        email: email.value,
        password: password.value,
      },
    });

    if (res.success) {
      // Simpan token ke cookie
      const token = useCookie('auth_token');
      token.value = res.token ?? '';

      useChangeToken(res.token ?? '', res.user);

      console.log("token : ", res.token);

      authStore.setToken(res.token as string);
      

      // Redirect ke dashboard
      await navigateTo('/', { replace: true });
      // window.location.href = '/';
    } else {
      error.value = res.message || 'Login gagal';
    }
  } catch (err: any) {
    error.value = err.data?.message || 'Terjadi kesalahan, coba lagi nanti.';
  } finally {
    loading.value = false;
  }
};

// 👇 Handle submit form
const handleSubmit = (e: Event) => {
  e.preventDefault();
  login();
};
</script>

<template>
  <div>
    <h3 class="text-xl font-semibold mb-6">Masuk ke Akun Anda</h3>

    <!-- Error Message -->
    <div v-if="error" class="mb-4 p-3 bg-red-100 text-red-700 text-sm rounded-md">
      {{ error }}
    </div>

    <form @submit="handleSubmit" class="space-y-6">
      <div>
        <label for="email" class="block text-sm font-medium text-gray-700"
          >Email address</label
        >
        <input
          id="email"
          v-model="email"
          name="email"
          type="email"
          required
          class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder="contoh@email.com"
        />
      </div>

      <div>
        <label for="password" class="block text-sm font-medium text-gray-700"
          >Password</label
        >
        <input
          id="password"
          v-model="password"
          name="password"
          type="password"
          required
          class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder="••••••••"
        />
      </div>

      <div class="flex items-center justify-between">
        <div class="flex items-center">
          <input
            id="remember-me"
            name="remember-me"
            type="checkbox"
            class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
          />
          <label for="remember-me" class="ml-2 block text-sm text-gray-900"
            >Remember me</label
          >
        </div>

        <div class="text-sm">
          <a
            href="#"
            class="font-medium text-indigo-600 hover:text-indigo-500"
            >Forgot password?</a
          >
        </div>
      </div>

      <div>
        <button
          type="submit"
          :disabled="loading"
          class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          <span v-if="!loading">Sign in</span>
          <span v-else>Signing in...</span>
        </button>
      </div>
    </form>

    <div class="mt-6 text-center">
      <p class="text-sm text-gray-600">
        Belum punya akun?
        <NuxtLink
          to="/register"
          class="font-medium text-indigo-600 hover:text-indigo-500"
          >Daftar di sini</NuxtLink
        >
      </p>
    </div>
  </div>
</template>
