const fs = require('fs');
const path = require('path');
const jsonServer = require('json-server');

const server = jsonServer.create();
const router = jsonServer.router(path.resolve(__dirname, 'db.json'));

// Задержка для имитаций реального сервера
server.use(async (req, res, next) => {
    await new Promise((res) => {
        setTimeout(res, 800);
    });
    next();
});

// Проверяем авторизован ли пользователь
// eslint-disable-next-line
server.use((req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(403).json({ message: 'AUTH ERROR' });
    }
    next();
});

server.use(jsonServer.defaults());
server.use(router);

// Эндпоинт для логина
server.post('/login', (req, res) => {
    const { username, password } = req.body;
    const db = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'db.json'), 'UTF-8'));
    const { users } = db;

    const userFromBd = users.find(
        (user) => user.username === username && user.password === password,
    );

    if (userFromBd) {
        return res.json(userFromBd);
    }

    return res.status(403).json({ message: 'AUTH ERROR' });
});

// Запуск сервера на 8000 порту
server.listen(8000, () => {
    console.log('JSON Server is running on port 8000');
});
