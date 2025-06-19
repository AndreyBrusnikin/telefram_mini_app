<template>
  <NuxtPage />
</template>

<script setup lang="ts">
// Настройка SEO для приложения
useHead({
  htmlAttrs: {
    lang: 'ru'
  },
  link: [
    {
      rel: 'icon',
      type: 'image/x-icon',
      href: '/favicon.ico'
    }
  ]
})

// Настройка темы на основе Telegram
onMounted(() => {
  if (process.client && window.Telegram?.WebApp) {
    const webApp = window.Telegram.WebApp
    
    // Применяем цвета Telegram к CSS переменным
    const root = document.documentElement
    
    if (webApp.themeParams) {
      if (webApp.themeParams.bg_color) {
        root.style.setProperty('--tg-theme-bg-color', webApp.themeParams.bg_color)
      }
      if (webApp.themeParams.text_color) {
        root.style.setProperty('--tg-theme-text-color', webApp.themeParams.text_color)
      }
      if (webApp.themeParams.hint_color) {
        root.style.setProperty('--tg-theme-hint-color', webApp.themeParams.hint_color)
      }
      if (webApp.themeParams.button_color) {
        root.style.setProperty('--tg-theme-button-color', webApp.themeParams.button_color)
      }
      if (webApp.themeParams.button_text_color) {
        root.style.setProperty('--tg-theme-button-text-color', webApp.themeParams.button_text_color)
      }
      if (webApp.themeParams.secondary_bg_color) {
        root.style.setProperty('--tg-theme-secondary-bg-color', webApp.themeParams.secondary_bg_color)
      }
    }
  }
})
</script> 