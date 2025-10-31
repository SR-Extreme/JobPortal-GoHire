const express = require('express');
const router = express.Router();
const internshipsController = require('../controllers/internships.controller');

// Get all internships
router.get('/', internshipsController.getInternships);

// Get internship by ID
router.get('/:id', internshipsController.getInternshipById);

// Delete internship
router.delete('/:id', internshipsController.deleteInternship);

module.exports = router;

