const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();

// Обслуживание вашей главной страницы
app.use(express.static('public'));

// Прокси для dufax.net, который вырезает защиту
app.use('/dufax-proxy', createProxyMiddleware({
    target: 'https://dufax.net',
    changeOrigin: true,
    onProxyRes: function (proxyRes) {
        // Полностью удаляем заголовки, блокирующие iframe
        delete proxyRes.headers['x-frame-options'];
        delete proxyRes.headers['content-security-policy'];
    }
}));

app.listen(3000, () => console.log('Сервер запущен на http://localhost:3000'));
