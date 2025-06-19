# Telegram Mini App - Профиль пользователя

Современное мини-приложение для Telegram, созданное с использованием Nuxt 3, Pinia, TypeScript и Composition API. Приложение позволяет пользователям просматривать и редактировать свой профиль, полученный через Telegram Web App API.

## 🚀 Возможности

- ✅ **Авторизация через Telegram API** - автоматическое получение данных пользователя
- ✅ **Управление профилем** - просмотр и редактирование имени пользователя
- ✅ **Копирование имени** - быстрое копирование имени в буфер обмена
- ✅ **Адаптивный дизайн** - оптимизация для мобильных устройств
- ✅ **Темная тема** - автоматическое переключение в соответствии с темой Telegram
- ✅ **TypeScript** - полная типизация для надежной разработки
- ✅ **Pinia Store** - современное управление состоянием
- ✅ **Обработка ошибок** - надежная обработка всех сценариев

## 🛠️ Технический стек

- **Nuxt 3** - Полнофункциональный Vue.js фреймворк
- **Vue 3** - Composition API с `<script setup>`
- **TypeScript** - Строгая типизация
- **Pinia** - Управление состоянием
- **@vueuse/core** - Коллекция Vue Composition утилит
- **Telegram Web App API** - Интеграция с Telegram

## 📦 Установка и запуск

### Предварительные требования

- Node.js 18.0.0 или выше
- npm, yarn, pnpm или bun
- Telegram бот (для тестирования)

### 1. Клонирование репозитория

\`\`\`bash
git clone <your-repository-url>
cd telegram-mini-app
\`\`\`

### 2. Установка зависимостей

\`\`\`bash
# npm
npm install

# yarn
yarn install

# pnpm
pnpm install

# bun
bun install
\`\`\`

### 3. Настройка переменных окружения

Создайте файл `.env` в корне проекта:

\`\`\`env
# Telegram Bot Configuration
TELEGRAM_BOT_TOKEN=your_bot_token_here
TELEGRAM_BOT_USERNAME=your_bot_username_here

# Nuxt Configuration
NUXT_SECRET_KEY=your_secret_key_here
\`\`\`

### 4. Запуск в режиме разработки

\`\`\`bash
# npm
npm run dev

# yarn
yarn dev

# pnpm
pnpm run dev

# bun
bun run dev
\`\`\`

Приложение будет доступно по адресу `http://localhost:3000`

### 5. Сборка для продакшена

\`\`\`bash
# npm
npm run build

# yarn
yarn build

# pnpm
pnpm run build

# bun
bun run build
\`\`\`

### 6. Предварительный просмотр продакшен сборки

\`\`\`bash
# npm
npm run preview

# yarn
yarn preview

# pnpm
pnpm run preview

# bun
bun run preview
\`\`\`

## 🤖 Настройка Telegram бота

### 1. Создание бота

1. Найдите [@BotFather](https://t.me/botfather) в Telegram
2. Отправьте команду `/newbot`
3. Следуйте инструкциям для создания бота
4. Скопируйте токен бота

### 2. Настройка Web App

1. Отправьте команду `/mybots` в [@BotFather](https://t.me/botfather)
2. Выберите вашего бота
3. Выберите "Bot Settings" → "Menu Button"
4. Выберите "Configure Menu Button"
5. Введите URL вашего приложения (например: `https://your-domain.com`)

### 3. Настройка команд бота (опционально)

Отправьте [@BotFather](https://t.me/botfather) команду `/setcommands` и добавьте:

\`\`\`
start - Запустить мини-приложение
profile - Открыть профиль
\`\`\`

## 🏗️ Архитектура проекта

\`\`\`
telegram-mini-app/
├── assets/
│   └── css/
│       └── main.css              # Основные стили
├── pages/
│   └── index.vue                 # Главная страница профиля
├── plugins/
│   └── telegram.client.ts        # Инициализация Telegram WebApp
├── server/
│   └── api/
│       └── user/
│           └── update.post.ts    # API для обновления профиля
├── stores/
│   └── user.ts                   # Pinia store для пользователя
├── types/
│   ├── global.d.ts               # Глобальные типы
│   └── telegram.ts               # Типы Telegram API
├── app.vue                       # Корневой компонент
├── nuxt.config.ts                # Конфигурация Nuxt
├── package.json                  # Зависимости
└── README.md                     # Документация
\`\`\`

## 📱 Использование

### Основные функции

1. **Просмотр профиля** - отображение имени пользователя и аватара из Telegram
2. **Редактирование имени** - изменение имени и фамилии через форму
3. **Копирование имени** - кнопка для быстрого копирования в буфер обмена
4. **Адаптивность** - корректная работа на мобильных устройствах

### Особенности для мобильных устройств

- Автоматическая прокрутка к форме при фокусе на поле ввода
- Скрытие клавиатуры после отправки формы
- Поддержка viewport изменений
- Тактильная обратная связь через Telegram Haptic API

## 🔧 API и интеграции

### Telegram Web App API

Приложение использует следующие возможности Telegram Web App:

- `window.Telegram.WebApp.initDataUnsafe` - получение данных пользователя
- `window.Telegram.WebApp.ready()` - инициализация приложения
- `window.Telegram.WebApp.expand()` - развертывание на весь экран
- `window.Telegram.WebApp.HapticFeedback` - тактильная обратная связь

### Pinia Store

Store `useUserStore` предоставляет:

- **State**: `profile`, `isAuthenticated`, `isLoading`, `error`
- **Getters**: `displayName`, `avatar`
- **Actions**: `authenticateWithTelegram`, `updateUserName`, `logout`, `clearError`

## 🎨 Стилизация

### CSS переменные

Приложение использует CSS переменные для поддержки тем Telegram:

\`\`\`css
--tg-theme-bg-color
--tg-theme-text-color
--tg-theme-hint-color
--tg-theme-button-color
--tg-theme-button-text-color
--tg-theme-secondary-bg-color
\`\`\`

### Адаптивность

- Поддержка экранов от 320px
- Специальные стили для мобильных устройств
- Учет safe-area-inset для устройств с вырезами

## 🐛 Отладка

### Проверка в Telegram

1. Откройте вашего бота в Telegram
2. Нажмите на кнопку меню или отправьте команду `/start`
3. Приложение должно открыться в WebView

### Проверка в браузере

Для тестирования вне Telegram создайте mock объект:

\`\`\`javascript
window.Telegram = {
  WebApp: {
    ready: () => {},
    expand: () => {},
    initDataUnsafe: {
      user: {
        id: 123456789,
        first_name: "Тест",
        last_name: "Пользователь",
        username: "testuser"
      }
    }
  }
}
\`\`\`

## 🚀 Деплой

### Vercel

1. Подключите ваш репозиторий к Vercel
2. Установите переменные окружения в настройках проекта
3. Деплой произойдет автоматически

### Netlify

1. Подключите репозиторий к Netlify
2. Установите команду сборки: `npm run build`
3. Установите папку вывода: `.output/public`
4. Добавьте переменные окружения

### Собственный сервер

\`\`\`bash
# Сборка приложения
npm run build

# Запуск в продакшене
node .output/server/index.mjs
\`\`\`

## 📄 Лицензия

MIT License

## 🤝 Вклад в проект

1. Форкните репозиторий
2. Создайте ветку для новой функции (`git checkout -b feature/amazing-feature`)
3. Зафиксируйте изменения (`git commit -m 'Add amazing feature'`)
4. Отправьте в ветку (`git push origin feature/amazing-feature`)
5. Откройте Pull Request

## 📞 Поддержка

Если у вас есть вопросы или проблемы, создайте issue в репозитории.

---

⭐ Если этот проект был полезен, поставьте звездочку!
