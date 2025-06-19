import type { TelegramWebApp } from '@types/telegram-web-app'

declare global {
  interface Window {
    Telegram?: {
      WebApp: TelegramWebApp
    }
  }
} 