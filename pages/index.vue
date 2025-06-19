<template>
  <div class="app-container">
    <!-- Загрузка -->
    <div v-if="userStore.isLoading && !userStore.isAuthenticated" class="loading-page">
      <div class="loading-spinner"></div>
      <div class="loading-text">Загрузка...</div>
    </div>

    <!-- Профиль пользователя -->
    <div v-else-if="userStore.isAuthenticated && userStore.profile" class="profile-page">
      <!-- Верхняя часть - имя пользователя с кнопкой копирования -->
      <div class="profile-header">
        <div class="username-display">
          <span class="username-text">{{ userStore.displayName }}</span>
        </div>
        <button 
          class="copy-button" 
          @click="copyUsername"
          :disabled="isCopying"
          type="button"
        >
          <svg v-if="!isCopying" viewBox="0 0 24 24">
            <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/>
          </svg>
          <svg v-else viewBox="0 0 24 24">
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
          </svg>
        </button>
      </div>

      <!-- Центральная часть - аватар -->
      <div class="profile-center">
        <div class="avatar-container">
          <img 
            :src="userStore.avatar" 
            :alt="userStore.displayName"
            class="avatar"
            @error="handleAvatarError"
          >
        </div>
      </div>

      <!-- Нижняя часть - форма изменения имени -->
      <form @submit.prevent="handleSubmit" class="profile-form">
        <div class="form-group">
          <input
            v-model="firstName"
            type="text"
            class="form-input"
            placeholder="Введите имя"
            :disabled="userStore.isLoading"
            required
            maxlength="50"
            @focus="handleInputFocus"
            @blur="handleInputBlur"
          >
        </div>
        
        <div class="form-group">
          <input
            v-model="lastName"
            type="text"
            class="form-input"
            placeholder="Введите фамилию (необязательно)"
            :disabled="userStore.isLoading"
            maxlength="50"
            @focus="handleInputFocus"
            @blur="handleInputBlur"
          >
        </div>

        <button 
          type="submit" 
          class="submit-button"
          :disabled="userStore.isLoading || !firstName.trim()"
        >
          <div v-if="userStore.isLoading" class="loading-spinner"></div>
          {{ userStore.isLoading ? 'Сохранение...' : 'Сохранить изменения' }}
        </button>

        <!-- Сообщения об ошибках -->
        <div v-if="userStore.error" class="error-message">
          {{ userStore.error }}
        </div>

        <!-- Сообщение об успехе -->
        <div v-if="showSuccess" class="success-message">
          Имя успешно обновлено!
        </div>
      </form>
    </div>

    <!-- Ошибка авторизации -->
    <div v-else class="loading-page">
      <div class="error-message">
        {{ userStore.error || 'Ошибка загрузки приложения' }}
      </div>
      <button @click="retry" class="submit-button" style="max-width: 200px;">
        Повторить попытку
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '~/stores/user'

// Meta информация
useHead({
  title: 'Профиль - Telegram Mini App',
  meta: [
    {
      name: 'description',
      content: 'Telegram Mini App для управления профилем пользователя'
    }
  ]
})

// Store
const userStore = useUserStore()

// Reactive данные
const firstName = ref('')
const lastName = ref('')
const isCopying = ref(false)
const showSuccess = ref(false)
const isInputFocused = ref(false)

// Инициализация при монтировании
onMounted(async () => {
  await initializeApp()
})

// Следим за изменениями профиля и обновляем поля формы
watch(() => userStore.profile, (newProfile) => {
  if (newProfile) {
    firstName.value = newProfile.firstName
    lastName.value = newProfile.lastName || ''
  }
}, { immediate: true })

// Методы
const initializeApp = async () => {
  try {
    await userStore.authenticateWithTelegram()
  } catch (error) {
    console.error('Ошибка инициализации:', error)
  }
}

const handleSubmit = async () => {
  if (!firstName.value.trim()) return

  userStore.clearError()
  
  const success = await userStore.updateUserName(
    firstName.value, 
    lastName.value || undefined
  )

  if (success) {
    showSuccess.value = true
    setTimeout(() => {
      showSuccess.value = false
    }, 3000)
    
    // Скрыть клавиатуру на мобильных устройствах
    if (process.client && document.activeElement instanceof HTMLElement) {
      document.activeElement.blur()
    }
  }
}

const copyUsername = async () => {
  if (isCopying.value || !userStore.displayName) return

  try {
    isCopying.value = true
    
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(userStore.displayName)
    } else {
      // Fallback для старых браузеров
      const textArea = document.createElement('textarea')
      textArea.value = userStore.displayName
      textArea.style.position = 'fixed'
      textArea.style.left = '-999999px'
      textArea.style.top = '-999999px'
      document.body.appendChild(textArea)
      textArea.focus()
      textArea.select()
      document.execCommand('copy')
      textArea.remove()
    }

    // Уведомление Telegram о том, что текст скопирован
    if (window.Telegram?.WebApp) {
      window.Telegram.WebApp.HapticFeedback.notificationOccurred('success')
    }

    setTimeout(() => {
      isCopying.value = false
    }, 1500)
  } catch (error) {
    console.error('Ошибка копирования:', error)
    isCopying.value = false
    
    if (window.Telegram?.WebApp) {
      window.Telegram.WebApp.HapticFeedback.notificationOccurred('error')
    }
  }
}

const handleAvatarError = (event: Event) => {
  const img = event.target as HTMLImageElement
  img.src = 'https://via.placeholder.com/120x120/2481cc/ffffff?text=👤'
}

const handleInputFocus = () => {
  isInputFocused.value = true
  
  // Для мобильных устройств - прокрутить к форме
  if (process.client && window.innerWidth <= 768) {
    setTimeout(() => {
      const form = document.querySelector('.profile-form')
      if (form) {
        form.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'center' 
        })
      }
    }, 300)
  }
}

const handleInputBlur = () => {
  isInputFocused.value = false
}

const retry = async () => {
  await initializeApp()
}

// Управление клавиатурой для мобильных устройств
if (process.client) {
  // Обработка изменения высоты viewport (когда появляется клавиатура)
  const handleViewportChange = () => {
    if (isInputFocused.value) {
      const vh = window.innerHeight * 0.01
      document.documentElement.style.setProperty('--vh', `${vh}px`)
    }
  }

  window.addEventListener('resize', handleViewportChange)
  onUnmounted(() => {
    window.removeEventListener('resize', handleViewportChange)
  })
}
</script> 