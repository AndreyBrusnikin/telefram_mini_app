export default defineNuxtPlugin(() => {
  // Автоматически включаем mock режим в development если Telegram WebApp недоступен
  if (process.dev && process.client) {
    const { enableMockMode } = useTelegramMock()
    
    console.log('🧪 Проверяем необходимость mock режима...')
    console.log('🔍 window.Telegram:', window.Telegram)
    console.log('🔍 WebApp:', window.Telegram?.WebApp)
    
    // Функция для активации mock режима
    const tryEnableMock = () => {
      if (!window.Telegram?.WebApp) {
        console.log('🔄 Telegram WebApp не найден, активируем mock режим')
        const result = enableMockMode()
        if (result) {
          console.log('✅ Mock режим успешно активирован')
        } else {
          console.log('❌ Не удалось активировать mock режим')
        }
        return result
      }
      
      if (!window.Telegram?.WebApp?.initDataUnsafe?.user) {
        console.log('🔄 Данные пользователя отсутствуют, переактивируем mock режим')
        const result = enableMockMode()
        if (result) {
          console.log('✅ Mock режим переактивирован')
        }
        return result
      }
      
      console.log('✅ Telegram WebApp и данные пользователя найдены')
      return false
    }
    
    // Немедленно проверяем
    tryEnableMock()
    
    // Дополнительные проверки через интервалы
    setTimeout(() => tryEnableMock(), 100)
    setTimeout(() => tryEnableMock(), 500)
  }
}) 