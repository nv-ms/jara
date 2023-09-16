const jwt = require('jsonwebtoken');
require('dotenv').config();

const loginMiddleware = (req, res, next) => {
    const authHeader = req.headers.cookie;

    if (!authHeader) {
        // Check if the current route is already '/login'
        if (req.url === '/login') {
            return next(); // Continue to the login route
        }
        // Redirect to the login page
        return res.redirect('/login');
    }

    const token = authHeader.split("authtoken=")[1];

    if (!token) {
        // Check if the current route is already '/login'
        if (req.url === '/login') {
            return next(); // Continue to the login route
        }
        // Redirect to the login page
        return res.redirect('/login');
    }

    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.redirect('/login');
        }

        // Check if the user is already on the home page
        if (req.url === '/home') {
            return next(); // Continue to the next middleware
        }

        // Redirect to the home page
        return res.redirect('/home');
    });
};

module.exports = loginMiddleware;
