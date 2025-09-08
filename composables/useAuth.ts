// composables/useAuth.ts
import { ref, computed } from 'vue';
import { navigateTo, useCookie } from '#imports';
import type { User } from '~/types/user.type';

export const useAuth = () => {
  const token = useCookie('auth_token'); // simpan token di cookie (lebih aman dari localStorage)
  const user = ref<User | null>(null);

  const isAuthenticated = computed(() => !!token.value);

  const login = (newToken: string, userData: any) => {
    token.value = newToken;
    user.value = userData;
  };

  const logout = () => {
    token.value = null;
    user.value = null;
    navigateTo('/login');
  };

  return {
    token,
    user,
    isAuthenticated,
    login,
    logout,
  };
};
