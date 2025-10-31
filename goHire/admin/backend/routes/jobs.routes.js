const express = require('express');
const router = express.Router();
const jobsController = require('../controllers/jobs.controller');

// Get all jobs
router.get('/', jobsController.getJobs);

// Get job by ID
router.get('/:id', jobsController.getJobById);

// Delete job
router.delete('/:id', jobsController.deleteJob);

module.exports = router;

