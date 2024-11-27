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
    message: [
      { name: 'main', to: 'rrotatew@gmail.com', },
      { name: 'managerStars', to: 'yakushevnikita0501@gmail.com', }
    ],
    smtp: {
      host: "smtp.timeweb.ru",
      port: 25,
      auth: {
        user: 'exchanger@moneyflowzen.ru',
        pass: '>g!A<44\\gswHAK'
      }
    }
  }], '@nuxt/image'],

  runtimeConfig: {
    public: {
      databaseURL: process.env.databaseURL
    }
  }
})