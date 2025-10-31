const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller');

// Get premium users
router.get('/premium-users', adminController.getPremiumUsers);

// Get proof document
router.get('/company/proof/:proofId', adminController.getProofDocument);

module.exports = router;

