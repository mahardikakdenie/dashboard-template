import { useUserStore } from "~/store/users";

// plugins/auth.client.ts
export default defineNuxtPlugin(async (nuxtApp) => {
  if (process.client) {
    const authStore = useUserStore();
    const tokenCookie = useCookie('auth_token', {
      maxAge: 604800,
      sameSite: 'lax',
      path: '/',
    });

    // Jika ada token, coba ambil data user
    if (tokenCookie.value) {
      authStore.setToken(tokenCookie.value);

      try {
        // Ganti dengan endpoint API-mu
        const { data: user } = await useFetch('/api/users/me', {
          headers: {
            Authorization: `Bearer ${tokenCookie.value}`,
          },
        });

        // if (user.value) {
        //   authStore.setUserDatas(user);
        // }
      } catch (error) {
        // Token mungkin invalid → logout
        tokenCookie.value = null;
        // authStore.clearAuth();
      }
    }
  }
});
