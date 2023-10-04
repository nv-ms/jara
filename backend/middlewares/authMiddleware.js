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
            //return res.status(403).json({ error: 'Invalid token' });
            //redirect the user to login page in case of login error or when token expires
            res.redirect('/login');
        }
        next();
    });
};

module.exports = authenticateMiddleware;