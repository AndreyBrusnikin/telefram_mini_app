<template>
  <div class="docs-page">
    <div class="docs-container">
      <h1>📖 Инструкции по настройке</h1>
      
      <div class="section">
        <h2>🤖 Создание Telegram бота</h2>
        <ol>
          <li>Найдите <a href="https://t.me/botfather" target="_blank">@BotFather</a> в Telegram</li>
          <li>Отправьте команду <code>/newbot</code></li>
          <li>Введите имя бота (например: "My Profile App")</li>
          <li>Введите username (должен заканчиваться на "bot")</li>
          <li>Скопируйте токен бота</li>
        </ol>
      </div>
      
      <div class="section">
        <h2>🌐 Настройка Web App</h2>
        <ol>
          <li>Отправьте <code>/mybots</code> в @BotFather</li>
          <li>Выберите вашего бота</li>
          <li>Выберите "Bot Settings" → "Menu Button"</li>
          <li>Выберите "Configure Menu Button"</li>
          <li>Введите URL развернутого приложения (https://ваш-домен.com)</li>
        </ol>
      </div>
      
      <div class="section">
        <h2>🚀 Варианты деплоя</h2>
        <div class="deploy-options">
          <div class="deploy-option">
            <h3>Vercel (рекомендуется)</h3>
            <p>Быстрый и бесплатный деплой</p>
            <a href="https://vercel.com" target="_blank">vercel.com</a>
          </div>
          <div class="deploy-option">
            <h3>Netlify</h3>
            <p>Простая настройка</p>
            <a href="https://netlify.com" target="_blank">netlify.com</a>
          </div>
        </div>
      </div>
      
      <div class="section warning">
        <h2>⚠️ Важно</h2>
        <ul>
          <li><strong>HTTPS обязателен</strong> - Telegram работает только с защищенными соединениями</li>
          <li><strong>localhost не работает</strong> - нужен реальный домен</li>
          <li><strong>Тестирование</strong> - всегда проверяйте в реальном Telegram</li>
        </ul>
      </div>
      
      <div class="back-section">
        <NuxtLink to="/" class="back-button">← Вернуться к приложению</NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'Инструкции - Telegram Mini App'
})
</script>

<style scoped>
.docs-page {
  min-height: 100vh;
  padding: 20px;
  background: var(--tg-theme-bg-color, var(--background-color));
  color: var(--tg-theme-text-color, var(--text-color));
}

.docs-container {
  max-width: 800px;
  margin: 0 auto;
}

h1 {
  font-size: 24px;
  margin-bottom: 30px;
  text-align: center;
}

.section {
  margin-bottom: 30px;
  padding: 20px;
  background: var(--tg-theme-secondary-bg-color, var(--border-color));
  border-radius: 12px;
}

.section h2 {
  font-size: 20px;
  margin-bottom: 15px;
}

.section ol, .section ul {
  margin-left: 20px;
}

.section li {
  margin-bottom: 8px;
  line-height: 1.5;
}

code {
  background: var(--tg-theme-bg-color, var(--background-color));
  padding: 2px 6px;
  border-radius: 4px;
  font-family: monospace;
  border: 1px solid var(--border-color);
}

.deploy-options {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 15px;
  margin-top: 15px;
}

.deploy-option {
  padding: 15px;
  background: var(--tg-theme-bg-color, var(--background-color));
  border-radius: 8px;
  border: 1px solid var(--border-color);
}

.deploy-option h3 {
  margin-bottom: 8px;
  color: var(--tg-theme-button-color, var(--primary-color));
}

.warning {
  border-left: 4px solid var(--error-color);
}

.back-section {
  text-align: center;
  margin-top: 40px;
}

.back-button {
  display: inline-block;
  padding: 12px 24px;
  background: var(--tg-theme-button-color, var(--primary-color));
  color: var(--tg-theme-button-text-color, #ffffff);
  text-decoration: none;
  border-radius: 8px;
  font-weight: 500;
  transition: opacity 0.2s;
}

.back-button:hover {
  opacity: 0.9;
}

a {
  color: var(--tg-theme-link-color, var(--primary-color));
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}
</style> 