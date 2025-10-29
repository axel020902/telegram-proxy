const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type']
}));
app.use(express.json({ charset: 'utf-8' }));
app.use(express.urlencoded({ extended: true, charset: 'utf-8' }));

// Главная страница - информация о сервисе
app.get('/', (req, res) => {
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.json({
        service: 'Telegram Proxy Server',
        status: 'active',
        endpoints: {
            send: 'POST /send - отправка сообщения в Telegram',
            health: 'GET /health - проверка состояния сервера'
        },
        usage: {
            method: 'POST',
            endpoint: '/send',
            body: {
                token: 'YOUR_BOT_TOKEN',
                chat_id: 'YOUR_CHAT_ID',
                text: 'Your message text'
            }
        }
    });
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Основной endpoint для отправки сообщений
app.post('/send', async (req, res) => {
    try {
        const { token, chat_id, text } = req.body;

        // Валидация входных данных
        if (!token || !chat_id || !text) {
            return res.status(400).json({
                ok: false,
                error: 'Missing required parameters: token, chat_id, or text'
            });
        }

        // Отправка сообщения в Telegram API
        const telegramUrl = `https://api.telegram.org/bot${token}/sendMessage`;
        
        const response = await fetch(telegramUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            },
            body: JSON.stringify({
                chat_id: chat_id,
                text: text,
                parse_mode: 'HTML'
            })
        });

        const data = await response.json();

        // Возвращаем ответ от Telegram API
        if (data.ok) {
            res.json({
                ok: true,
                result: data.result,
                message_id: data.result?.message_id
            });
        } else {
            res.status(400).json({
                ok: false,
                error: data.description || 'Telegram API error',
                error_code: data.error_code
            });
        }

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({
            ok: false,
            error: error.message || 'Internal server error'
        });
    }
});

// Обработка несуществующих маршрутов
app.use((req, res) => {
    res.status(404).json({
        ok: false,
        error: 'Endpoint not found',
        available_endpoints: ['GET /', 'GET /health', 'POST /send']
    });
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`🚀 Telegram Proxy Server running on port ${PORT}`);
    console.log(`📝 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`⏰ Started at: ${new Date().toISOString()}`);
});

module.exports = app;

