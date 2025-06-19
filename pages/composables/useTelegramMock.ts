/**
 * Композабл для эмуляции Telegram WebApp в режиме разработки
 * Используется только для тестирования в обычном браузере
 */
export const useTelegramMock = () => {
  const enableMockMode = () => {
    if (process.client && !window.Telegram?.WebApp) {
      // Создаем mock объект для тестирования
      window.Telegram = {
        WebApp: {
          ready: () => console.log('Telegram WebApp ready (mock)'),
          expand: () => console.log('Telegram WebApp expand (mock)'),
          enableClosingConfirmation: () => console.log('Telegram WebApp enableClosingConfirmation (mock)'),
          setHeaderColor: (color: string) => console.log('Telegram WebApp setHeaderColor (mock):', color),
          
          // Mock данные пользователя
          initDataUnsafe: {
            user: {
              id: 123456789,
              first_name: "Тестовый",
              last_name: "Пользователь",
              username: "testuser",
              language_code: "ru",
              photo_url: "https://via.placeholder.com/120x120/2481cc/ffffff?text=👤"
            }
          },
          
          // Mock данные о приложении
          version: "6.0",
          platform: "web",
          colorScheme: "light",
          
          // Mock кнопки
          MainButton: {
            show: () => console.log('MainButton show (mock)'),
            hide: () => console.log('MainButton hide (mock)'),
            setText: (text: string) => console.log('MainButton setText (mock):', text),
            onClick: (callback: () => void) => console.log('MainButton onClick (mock)')
          },
          
          BackButton: {
            show: () => console.log('BackButton show (mock)'),
            hide: () => console.log('BackButton hide (mock)'),
            onClick: (callback: () => void) => console.log('BackButton onClick (mock)')
          },
          
          // Mock тактильная обратная связь
          HapticFeedback: {
            notificationOccurred: (type: string) => console.log('HapticFeedback notificationOccurred (mock):', type),
            impactOccurred: (style: string) => console.log('HapticFeedback impactOccurred (mock):', style),
            selectionChanged: () => console.log('HapticFeedback selectionChanged (mock)')
          },
          
          // Mock события
          onEvent: (eventType: string, callback: () => void) => {
            console.log('WebApp onEvent (mock):', eventType)
          },
          
          // Mock тема
          themeParams: {
            bg_color: '#ffffff',
            text_color: '#000000',
            hint_color: '#999999',
            link_color: '#2481cc',
            button_color: '#2481cc',
            button_text_color: '#ffffff',
            secondary_bg_color: '#f1f1f1'
          }
        }
      } as any
      
      console.log('🧪 Telegram WebApp Mock режим активирован для тестирования')
      console.log('📱 Для реального использования откройте приложение в Telegram')
      
      return true
    }
    
    return false
  }

  const isMockMode = computed(() => {
    if (!process.client) return false
    return window.Telegram?.WebApp && !window.Telegram.WebApp.initData
  })

  return {
    enableMockMode,
    isMockMode
  }
} 