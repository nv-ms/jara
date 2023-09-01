const jwt = require('jsonwebtoken');
require('dotenv').config();

const authenticateMiddleware = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    console.log(token);

    if (!token) {
        return res.status(401).json({ error: 'Unauthorized, invalid token' });
    }

    jwt.verify(token, process.env.SECRET_KEY, (err) => {
        if (err) {
            return res.status(403).json({ error: 'Invalid token' });
        }
        next();
    });
};

module.exports = authenticateMiddleware;
