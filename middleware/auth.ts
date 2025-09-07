// middleware/auth.ts
export default defineNuxtRouteMiddleware((to, from) => {
  const token = useCookie('auth_token');

  // Jika tidak ada token & bukan di halaman login → redirect ke login
  if (!token.value && to.path !== '/login') {
    return navigateTo('/auth/login');
  }

  // Jika sudah login & mencoba akses /login → redirect ke dashboard
  if (token.value && to.path === '/login') {
    return navigateTo('/dashboard');
  }
});
