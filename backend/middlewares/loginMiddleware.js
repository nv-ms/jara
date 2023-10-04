const jwt = require('jsonwebtoken');
require('dotenv').config();

const loginMiddleware = (req, res, next) => {
    const authHeader = req.headers.cookie;

    if (!authHeader) {
        if (req.url === '/login') {
            return next(); 
        }
        return res.redirect('/');
    }

    const token = authHeader.split("authtoken=")[1];

    if (!token) {
        if (req.url === '/login') {
            return next(); 
        }
        return res.redirect('/home');
    }

    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.redirect('/login');
        }

        if (req.url === '/home') {
            return next(); 
        }

        return res.redirect('/home');
    });
};

module.exports = loginMiddleware;
