import { defineNuxtPlugin, useCookie, useFetch } from '#imports';
import { useUserStore } from '~/store/users';
import type { User } from '~/types/user.type';

export default defineNuxtPlugin(async (nuxtApp) => {
  const tokenCookie = useCookie<string | null>('auth_token', {
    maxAge: 604800,
    sameSite: 'lax',
    path: '/',
  });

  if (!tokenCookie.value) return;

  const authStore = useUserStore();
  authStore.setToken(tokenCookie.value);

  try {
    const { data: user, error } = await useFetch<{success: boolean; message: string; data: User}>('/api/me', {
      headers: { Authorization: `Bearer ${tokenCookie.value}` },
    });

    if (error.value || !user.value) {
      throw new Error('Failed to fetch user');
    }

    const userData: User = {
      ...user.value.data,
      created_at: new Date(user.value.data.created_at as Date),
    };

    authStore.setAuthMe(userData);
  } catch (err) {
    tokenCookie.value = null;
    navigateTo('/auth/login', { replace: true });
  }
});
