const express = require('express');
const router = express.Router();
const applicationController = require('../controllers/applicationController');

router.post('/create', applicationController.createApplication);
//router.post('/update/:application_id', applicationController.updateApplication);

router.get('/:application_id/profile', applicationController.getApplication);

router.delete('/delete/:application_id', applicationController.deleteApplication);
module.exports = router;