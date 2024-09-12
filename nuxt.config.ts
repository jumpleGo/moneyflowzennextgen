// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  rootDir: './',

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "style/global.scss" as *;'
        }
      }
    }
  },

  compatibilityDate: '2024-09-08',
  modules: ['@pinia/nuxt'],

  runtimeConfig: {
    public: {
      databaseURL: process.env.databaseURL
    }
  }
})