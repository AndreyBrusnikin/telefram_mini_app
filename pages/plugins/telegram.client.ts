export default defineNuxtPlugin(() => {
  // Проверяем, что мы в браузере и доступен Telegram WebApp
  if (process.client && window.Telegram?.WebApp) {
    const webApp = window.Telegram.WebApp
    
    // Инициализируем WebApp
    webApp.ready()
    
    // Настраиваем базовые параметры
    webApp.expand()
    webApp.enableClosingConfirmation()
    
    // Устанавливаем цвета темы
    if (webApp.colorScheme === 'dark') {
      document.documentElement.classList.add('dark-theme')
    }
    
    // Слушаем изменения темы
    webApp.onEvent('themeChanged', () => {
      if (webApp.colorScheme === 'dark') {
        document.documentElement.classList.add('dark-theme')
      } else {
        document.documentElement.classList.remove('dark-theme')
      }
    })
    
    // Настраиваем кнопки WebApp (если нужно)
    webApp.MainButton.hide()
    webApp.BackButton.hide()
    
    console.log('Telegram WebApp инициализирован', {
      version: webApp.version,
      platform: webApp.platform,
      colorScheme: webApp.colorScheme
    })
  }
}) 