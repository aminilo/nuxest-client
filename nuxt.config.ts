// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  modules: [
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxtjs/color-mode',
    '@pinia/nuxt',
    'pinia-plugin-persistedstate/nuxt',
    'nuxt-toast'
  ],
  css: ['~/assets/css/main.css', 'leaflet/dist/leaflet.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {}
    }
  },
  runtimeConfig: {
    public: { apiBaseUrl: process.env.API_BASE_URL || 'http://localhost:4000' }
  },
  app: {
    head: {
      titleTemplate: '%s - NuxEst',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'author', content: 'NuxEst Team' },
        { property: 'og:site_name', content: 'NuxEst' },
        { name: 'theme-color', content: '#f59e0b' }, // Amber primary color
      ],
      link: [
        { rel: 'icon', type: 'image/png', href: '/favicon.png' }
      ]
    }
  }
});
