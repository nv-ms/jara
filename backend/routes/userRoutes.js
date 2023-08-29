//const express = require('express');
//const router = express.Router();
//const userController = require('../controllers/userController');


//router.post('/update/:userId', userController.updateUserProfile);

//router.delete('/delete/:user_id', userController.deleteUser);

//router.get('/:userId/profile', userController.getUserProfile);

//module.exports = router;

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware'); // Import the middleware

router.get('/:userId/profile', authMiddleware, userController.getUserProfile);
router.post('/update/:userId', authMiddleware, userController.updateUserProfile);
router.delete('/delete/:user_id', authMiddleware, userController.deleteUser);
router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);

module.exports = router;
