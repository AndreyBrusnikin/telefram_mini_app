export default defineNuxtPlugin(() => {
  // Автоматически включаем mock режим в development если Telegram WebApp недоступен
  if (process.dev && process.client) {
    const { enableMockMode } = useTelegramMock()
    
    console.log('🧪 Проверяем необходимость mock режима...')
    
    // Немедленно проверяем
    if (!window.Telegram?.WebApp) {
      console.log('🔄 Telegram WebApp не найден, активируем mock режим')
      enableMockMode()
    }
    
    // Дополнительная проверка через задержку
    setTimeout(() => {
      if (!window.Telegram?.WebApp?.initDataUnsafe?.user) {
        console.log('🔄 Данные пользователя отсутствуют, переактивируем mock режим')
        enableMockMode()
      }
    }, 200)
  }
}) 