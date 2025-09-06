// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite';
export default defineNuxtConfig({
	modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt', '@nuxtjs/i18n'],
	ssr: true,
	compatibilityDate: '2025-05-15',
	devtools: { enabled: true },
	css: ['~/assets/css/main.css'],
	vite: {
		plugins: [tailwindcss()],
	},
	devServer: {
		port: 3001,
	},
	runtimeConfig: {
		public: {
			apiBaseUrl: process.env.VITE_API_BASE_URL,
			imgbbApiKey: process.env.VITE_IMGBB_API_KEY,
			imgbbBaseUrl: process.env.VITE_IMG_BASE_URL,
		},
	},
	i18n: {
		locales: [
			{ code: 'en', language: 'en-US', file: 'en.json' },
			{ code: 'id', language: 'id-ID', file: 'id.json' },
		],
		defaultLocale: 'en',
	},
});
