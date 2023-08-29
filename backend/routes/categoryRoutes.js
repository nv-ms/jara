const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

router.post('/create', categoryController.createCategory);
router.post('/update/:category_id',categoryController.updateCategory);

router.get('/:category_id/profile',categoryController.getCategoryDetails);

router.delete('/delete/:category_id',categoryController.deleteCategory);
module.exports = router;