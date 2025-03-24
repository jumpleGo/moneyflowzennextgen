// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: true,

  rootDir: './',
  devServer: {
    port: 8080
  },

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
  modules: ['@pinia/nuxt', ['yandex-metrika-module-nuxt3', {
    id: 99093121,
    webvisor: true
  }], ['nuxt-mail', {
    message: [
      { name: 'main', to: 'rrotatew@gmail.com', },
    ],
    smtp: {
      host: "smtp.timeweb.ru",
      port: 25,
      auth: {
        user: 'exchanger@moneyflowzen.ru',
        pass: '>g!A<44\\gswHAK'
      }
    }
  }], '@nuxt/image', '@nuxtjs/seo'],

  robots: {
    rules: [
      { UserAgent: '*', Allow: '/' },
    ],
    sitemap: 'https://moneyflowzen.ru/sitemap.xml'
  },


  site: {
    url: 'https://moneyflowzen.ru',
    name: 'Money Flow Zen',
    description: 'Место, в котором финансовая грамотность и уровень понимания финансовых рынков выйдут на новый уровень.',
    defaultLocale: 'ru',
  },
  runtimeConfig: {
    public: {
      databaseURL: process.env.databaseURL
    }
  }
})