const express = require('express');
const router = express.Router();
const reviewsController = require('../controllers/reviewsController');

router.post('/create', reviewsController.createReview);
router.get('/:review_id/profile', reviewsController.getReviewDetails);
router.get('/GetReviews', reviewsController.getAllReviews);
router.delete('/delete/:review_id', reviewsController.deleteReview);

module.exports = router;
