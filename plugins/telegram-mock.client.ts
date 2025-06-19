export default defineNuxtPlugin(() => {
  // Автоматически включаем mock режим в development если Telegram WebApp недоступен
  if (process.dev && process.client) {
    const { enableMockMode } = useTelegramMock()
    
    // Проверяем через небольшую задержку, чтобы дать время загрузиться Telegram скрипту
    setTimeout(() => {
      if (!window.Telegram?.WebApp) {
        enableMockMode()
      }
    }, 100)
  }
}) 