// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  compatibilityDate: '2024-04-03',
  modules: ['@pinia/nuxt'],
  
  css: ['~/assets/css/main.css'],
  
  app: {
    head: {
      title: 'Telegram Mini App',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1, user-scalable=no' },
        { name: 'theme-color', content: '#2481cc' }
      ],
      script: [
        {
          src: 'https://telegram.org/js/telegram-web-app.js',
          defer: true
        }
      ]
    }
  },

  ssr: false,
  
  typescript: {
    strict: true,
    typeCheck: 'build'
  },

  runtimeConfig: {
    public: {
      telegramBotToken: process.env.TELEGRAM_BOT_TOKEN || '',
      telegramBotUsername: process.env.TELEGRAM_BOT_USERNAME || ''
    }
  }
})
