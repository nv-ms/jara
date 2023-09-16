const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.post('/logout', userController.logoutUser);
router.post('/update/:userId', userController.updateUserProfile);
router.delete('/delete/:user_id', userController.deleteUser);
router.get('/:userId/profile', userController.getUserProfile);

module.exports = router;
