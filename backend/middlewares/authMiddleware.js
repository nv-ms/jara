const jwt = require('jsonwebtoken');
const userModel = require('../models/users');

module.exports = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        const user = await userModel.findOne({ where: { id: decoded.userId } });

        if (!user) {
            throw new Error();
        }

        req.user = user; // Attach user to the request object
        next(); // Move on to the next middleware or route handler
    } catch (error) {
        res.status(401).json({ error: 'Authentication failed' });
    }
};





