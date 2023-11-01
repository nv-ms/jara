const express = require('express');
const router = express.Router();
const reviewsController = require('../controllers/reviewsController');

router.post('/create', reviewsController.createReview);
router.get('/:review_id/profile', reviewsController.getReviewDetails);
router.get('/:job_id/jobReview', reviewsController.getAllReviewsForJob);
router.get('/:userID/userReview', reviewsController.getAllReviewsForUser);
router.get('/GetReviews', reviewsController.getAllReviews);
router.delete('/delete/:review_id', reviewsController.deleteReview);

module.exports = router;
