import { defineStore } from 'pinia'
import type { UserProfile, UserState, TelegramWebAppUser } from '~/types/telegram'

export const useUserStore = defineStore('user', () => {
  // State
  const profile = ref<UserProfile | null>(null)
  const isAuthenticated = ref(false)
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  // Getters
  const displayName = computed(() => {
    if (!profile.value) return ''
    return profile.value.displayName || `${profile.value.firstName} ${profile.value.lastName || ''}`.trim()
  })

  const avatar = computed(() => {
    return profile.value?.photoUrl || 'https://via.placeholder.com/120x120/2481cc/ffffff?text=👤'
  })

  // Actions
  const setLoading = (loading: boolean) => {
    isLoading.value = loading
  }

  const setError = (errorMessage: string | null) => {
    error.value = errorMessage
  }

  const clearError = () => {
    error.value = null
  }

  const authenticateWithTelegram = async (): Promise<boolean> => {
    try {
      setLoading(true)
      clearError()

      console.log('🔍 Начинаем авторизацию...')
      console.log('📱 window.Telegram:', window.Telegram)
      console.log('🌐 process.client:', process.client)

      // Если Telegram WebApp недоступен, пытаемся активировать mock режим
      if (!window.Telegram?.WebApp) {
        console.log('❌ Telegram WebApp недоступен, активируем mock режим...')
        
        // Используем composable для активации mock режима
        const { enableMockMode } = useTelegramMock()
        const mockActivated = enableMockMode()
        
        if (mockActivated) {
          console.log('✅ Mock режим активирован, ждем инициализации...')
          // Даем время на инициализацию mock данных
          await new Promise(resolve => setTimeout(resolve, 100))
        } else {
          throw new Error('Не удалось активировать режим разработки. Откройте приложение в Telegram или обновите страницу.')
        }
      }

      // Проверяем, доступен ли Telegram WebApp (включая mock)
      if (!window.Telegram?.WebApp) {
        console.log('❌ Telegram WebApp все еще недоступен после попытки активации mock режима')
        throw new Error('Telegram WebApp недоступен. Откройте приложение в Telegram или используйте режим разработки.')
      }

      const webApp = window.Telegram.WebApp
      console.log('✅ Telegram WebApp найден:', webApp)
      console.log('📊 initDataUnsafe:', webApp.initDataUnsafe)
      
      webApp.ready()

      // Получаем данные пользователя из Telegram
      const telegramUser = webApp.initDataUnsafe?.user

      console.log('👤 Данные пользователя:', telegramUser)

      if (!telegramUser) {
        console.log('❌ Пользователь не найден в initDataUnsafe')
        throw new Error('Не удалось получить данные пользователя. Попробуйте обновить страницу или используйте кнопку "Включить тестовый режим".')
      }

      // Преобразуем данные Telegram в наш формат
      const userProfile: UserProfile = {
        id: telegramUser.id,
        firstName: telegramUser.first_name,
        lastName: telegramUser.last_name,
        username: telegramUser.username,
        photoUrl: telegramUser.photo_url,
        displayName: `${telegramUser.first_name} ${telegramUser.last_name || ''}`.trim()
      }

      profile.value = userProfile
      isAuthenticated.value = true

      // Настраиваем Telegram WebApp
      webApp.expand()
      webApp.setHeaderColor('#2481cc')

      console.log('✅ Авторизация успешна:', userProfile)
      return true
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Ошибка авторизации'
      console.error('❌ Ошибка авторизации:', err)
      setError(errorMessage)
      return false
    } finally {
      setLoading(false)
    }
  }

  const updateUserName = async (newFirstName: string, newLastName?: string): Promise<boolean> => {
    try {
      setLoading(true)
      clearError()

      if (!profile.value) {
        throw new Error('Пользователь не авторизован')
      }

      if (!newFirstName.trim()) {
        throw new Error('Имя не может быть пустым')
      }

      // Обновляем профиль
      const updatedProfile: UserProfile = {
        ...profile.value,
        firstName: newFirstName.trim(),
        lastName: newLastName?.trim() || '',
        displayName: `${newFirstName.trim()} ${newLastName?.trim() || ''}`.trim()
      }

      profile.value = updatedProfile

      // Здесь можно добавить отправку данных на сервер
      // await $fetch('/api/user/update', { 
      //   method: 'POST', 
      //   body: updatedProfile 
      // })

      return true
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Ошибка обновления имени'
      setError(errorMessage)
      return false
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    profile.value = null
    isAuthenticated.value = false
    clearError()
  }

  return {
    // State
    profile: readonly(profile),
    isAuthenticated: readonly(isAuthenticated),
    isLoading: readonly(isLoading),
    error: readonly(error),
    
    // Getters
    displayName,
    avatar,
    
    // Actions
    authenticateWithTelegram,
    updateUserName,
    logout,
    clearError
  }
}) 