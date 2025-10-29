# 🤖 Telegram Proxy Server

Прокси-сервер для отправки сообщений в Telegram Bot API. Решает проблемы с доступом к Telegram API из России.

## 📋 Описание

Этот сервер принимает POST-запросы с данными для отправки сообщения и перенаправляет их в Telegram Bot API.

## 🚀 Развертывание на Render

### Шаг 1: Подготовка GitHub репозитория

1. Создайте новый репозиторий на GitHub (например, `telegram-proxy-server`)
2. Загрузите в него все файлы из папки `telegram-proxy`:
   - `index.js`
   - `package.json`
   - `.gitignore`
   - `README.md`

```bash
# Инициализация Git (если еще не сделано)
cd telegram-proxy
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/ВАШ_USERNAME/telegram-proxy-server.git
git push -u origin main
```

### Шаг 2: Создание Web Service на Render

1. Зайдите на [render.com](https://render.com)
2. Войдите или зарегистрируйтесь (можно через GitHub)
3. Нажмите **"New +"** → **"Web Service"**
4. Подключите ваш GitHub репозиторий
5. Выберите репозиторий `telegram-proxy-server`

### Шаг 3: Настройка параметров

Заполните настройки:

- **Name**: `telegram-proxy` (или любое другое имя)
- **Region**: `Frankfurt (EU Central)` (ближайший к России)
- **Branch**: `main`
- **Root Directory**: оставьте пустым
- **Runtime**: `Node`
- **Build Command**: `npm install`
- **Start Command**: `npm start`
- **Plan**: `Free` (бесплатный план)

### Шаг 4: Переменные окружения (опционально)

Если нужно, можно добавить переменные окружения:
- **NODE_ENV**: `production`

### Шаг 5: Deploy

1. Нажмите **"Create Web Service"**
2. Дождитесь завершения деплоя (обычно 2-5 минут)
3. После успешного деплоя вы получите URL вида:
   ```
   https://telegram-proxy-XXXXX.onrender.com
   ```

## 📡 API Endpoints

### 1. GET `/`
Информация о сервисе

**Ответ:**
```json
{
  "service": "Telegram Proxy Server",
  "status": "active",
  "endpoints": {...}
}
```

### 2. GET `/health`
Проверка состояния сервера

**Ответ:**
```json
{
  "status": "ok",
  "timestamp": "2025-10-29T12:00:00.000Z"
}
```

### 3. POST `/send`
Отправка сообщения в Telegram

**Запрос:**
```json
{
  "token": "YOUR_BOT_TOKEN",
  "chat_id": "YOUR_CHAT_ID",
  "text": "Текст сообщения"
}
```

**Ответ (успешно):**
```json
{
  "ok": true,
  "result": {...},
  "message_id": 123
}
```

**Ответ (ошибка):**
```json
{
  "ok": false,
  "error": "Error description"
}
```

## 🧪 Тестирование

### Через curl (PowerShell):

```powershell
$body = @{
    token = "YOUR_BOT_TOKEN"
    chat_id = "YOUR_CHAT_ID"
    text = "Тестовое сообщение"
} | ConvertTo-Json

Invoke-RestMethod -Uri "https://YOUR-APP.onrender.com/send" -Method POST -ContentType "application/json" -Body $body
```

### Через JavaScript (fetch):

```javascript
fetch("https://YOUR-APP.onrender.com/send", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    token: "YOUR_BOT_TOKEN",
    chat_id: "YOUR_CHAT_ID",
    text: "Тестовое сообщение"
  })
})
.then(res => res.json())
.then(data => console.log(data));
```

## ⚠️ Важные замечания

1. **Бесплатный план Render**:
   - Сервис "засыпает" после 15 минут неактивности
   - Первый запрос после сна может занять 30-60 секунд (холодный старт)
   - Месячный лимит: 750 часов работы

2. **Безопасность**:
   - Не храните токены в коде
   - Передавайте токен в каждом запросе
   - Рассмотрите добавление аутентификации для защиты endpoint

3. **Производительность**:
   - Для постоянной работы рассмотрите платный план
   - Или используйте "ping" сервисы для поддержания активности

## 📝 Использование в вашем сайте

После развертывания, обновите код на сайте:

```javascript
fetch("https://YOUR-APP.onrender.com/send", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    token: "8050200832:AAH5ScyG__5FCxX9_nEDdU0QrRCGvXlIU58",
    chat_id: "-1003143740246",
    text: messageText
  })
});
```

**Замените:**
- `YOUR-APP` на имя вашего приложения на Render
- Токен и chat_id на ваши реальные данные

## 🔧 Локальная разработка

```bash
# Установка зависимостей
npm install

# Запуск в режиме разработки
npm run dev

# Запуск в продакшн режиме
npm start
```

Сервер будет доступен по адресу: `http://localhost:3000`

## 📦 Структура проекта

```
telegram-proxy/
├── index.js          # Основной файл сервера
├── package.json      # Зависимости и скрипты
├── .gitignore       # Исключения для Git
└── README.md        # Документация
```

## 🆘 Поддержка

При возникновении проблем:
1. Проверьте логи на Render: Dashboard → ваш сервис → Logs
2. Убедитесь, что сервис активен (не в режиме сна)
3. Проверьте правильность токена и chat_id
4. Протестируйте endpoint `/health` для проверки доступности

---

**Создано для проекта УютСтрой72** 🏠

