const express = require('express');
const router = express.Router();
const applicantsController = require('../controllers/applicants.controller');

// Get all applicants
router.get('/', applicantsController.getApplicants);

// Get applicant by ID
router.get('/:id', applicantsController.getApplicantById);

// Delete applicant
router.delete('/:id', applicantsController.deleteApplicant);

module.exports = router;

