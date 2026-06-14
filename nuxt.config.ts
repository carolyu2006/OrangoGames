export default defineNuxtConfig({
  compatibilityDate: '2026-06-07',
  devtools: { enabled: false },
  css: ['~/assets/css/main.css'],
  ignore: [
    '**/dist/**',
    '**/.output/**',
  ],
  vite: {
    server: {
      watch: {
        ignored: ['**/dist/**', '**/.output/**'],
      },
    },
  },
  nitro: {
    preset: 'cloudflare-pages',
    compatibilityDate: '2026-06-07',
    minify: false,
    rollupConfig: {
      treeshake: false,
    },
  },
  app: {
    head: {
      title: 'Orango Games',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Game library and room creation platform' }
      ]
    }
  }
})
