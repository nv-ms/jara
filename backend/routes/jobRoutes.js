const express = require('express');
const router = express.Router();
const jobController = require('../controllers/jobController');

router.post('/create', jobController.createJob);
router.get('/fetchJobs', jobController.getjobList);
router.get('/search/:keyword', jobController.searchJobs);
router.get('/:job_id/details', jobController.getJobDetails);
router.delete('/delete/:job_id', jobController.deleteJob);

module.exports = router;
