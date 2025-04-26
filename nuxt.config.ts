// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: true,

  rootDir: '.',
  devServer: {
    port: 8080
  },

  app: {
    head: {
      htmlAttrs: {
        lang: 'ru'
      }
    }
  },

  alias: {
    "@assets": "/<rootDir>/assets",
    "@css": "/<rootDir>/style",
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "~/style/variables.scss" as *;'
        }
      }
    }
  },
  css: ['~/style/global.scss'],

  compatibilityDate: '2024-09-08',
  modules: ['@pinia/nuxt', ['yandex-metrika-module-nuxt3', {
    id: 99093121,
    webvisor: true,
    defer: true
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
  }], '@nuxt/image', '@nuxtjs/sitemap', '@nuxtjs/robots'],

  sitemap: {
    exclude: [
      '/test', '/exchanger', '/adminex',
      '/gift', '/guideStartToTrading', '/guideStartToCrypto'
    ],
    sources: ['/api/sitemap/sitemap']
  },

  robots: {
    disallow: ['/test', '/exchanger', '/adminex', '/gift', '/guideStartToTrading', '/guideStartToCrypto'],
  },

  runtimeConfig: {
    public: {
      databaseURL: process.env.databaseURL,
      ASSETS_IMAGE_BUCKET: process.env.ASSETS_IMAGE_BUCKET,
    }
  }
})