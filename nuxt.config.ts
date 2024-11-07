// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  rootDir: './',
  alias: {
    "@assets": "/<rootDir>/assets",
  },
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
  modules: ['@pinia/nuxt', ['nuxt-mail', {
    message: {
      to: 'foo@bar.de',
    },
    smtp: {
      host: "smtp.example.com",
      port: 587,
    },
  }], '@nuxt/image'],

  runtimeConfig: {
    public: {
      databaseURL: process.env.databaseURL
    }
  }
})