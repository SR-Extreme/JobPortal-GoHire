const express = require('express');
const router = express.Router();
const recruitersController = require('../controllers/recruiters.controller');

// Get all recruiters
router.get('/', recruitersController.getRecruiters);

// Get recruiter by ID
router.get('/:id', recruitersController.getRecruiterById);

// Delete recruiter
router.delete('/:id', recruitersController.deleteRecruiter);

module.exports = router;

