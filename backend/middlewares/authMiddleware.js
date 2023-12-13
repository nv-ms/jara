const jwt = require('jsonwebtoken');
require('dotenv').config();

const authenticateMiddleware = (req, res, next) => {
    const authHeader = req.headers.cookie;
    if(!authHeader){
        res.redirect('/login');
    }
    const token = authHeader.split("authtoken=")[1];
    if (!token) {
        res.redirect('/login');
    }
    jwt.verify(token, process.env.SECRET_KEY, (err) => {
        if (err) {
            res.redirect('/login');
        }
        next();
    });
};
module.exports = authenticateMiddleware;