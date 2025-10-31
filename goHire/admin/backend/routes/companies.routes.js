const express = require('express');
const router = express.Router();
const companiesController = require('../controllers/companies.controller');

// Get all companies
router.get('/', companiesController.getCompanies);

// Get companies awaiting verification
router.get('/awaiting-verification', companiesController.getCompaniesAwaitingVerification);

// Verify company
router.post('/verify/:id', companiesController.verifyCompany);

// Get company by ID
router.get('/:id', companiesController.getCompanyById);

// Delete company
router.delete('/:id', companiesController.deleteCompany);

module.exports = router;

