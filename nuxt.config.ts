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
      to: 'rrotatew@gmail.com',
    },
    host: "smtp.timeweb.ru",
    port: 25,
    auth: {
      user: 'emil@moneyflowzen.ru',
      pass: 'B|.Wc15GO/X$hV'
    }
  }], '@nuxt/image'],

  runtimeConfig: {
    public: {
      databaseURL: process.env.databaseURL
    }
  }
})