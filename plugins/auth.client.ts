// plugins/auth.client.ts
import { ofetch } from 'ofetch';

export default defineNuxtPlugin((nuxtApp) => {
  const token = useCookie('auth_token');

  // ✅ Extend $fetch dengan interceptor
  nuxtApp.$fetch = ofetch.create({
    onRequest({ options }) {
      if (token.value) {
        // Pastikan headers adalah plain object
        options.headers = options.headers || {};

        // Handle jika headers adalah instance Headers
        if (options.headers instanceof Headers) {
          options.headers.set('Authorization', `Bearer ${token.value}`);
        } else {
          // Jika object biasa, assign langsung
          (options.headers as Record<string, string>).Authorization = `Bearer ${token.value}`;
        }
      }
      return options;
    },

    // ✅ Opsional: Handle response 401 → auto logout
    onResponseError({ response }) {
      if (response.status === 401) {
        token.value = null;
        navigateTo('/login', { replace: true });
      }
    },
  });
});
