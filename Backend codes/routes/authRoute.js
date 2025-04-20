const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Authentication routes
router.post('/signup', authController.signup); // Regular user signup (no admin role creation)
router.post('/admin-signup', authController.adminSignup); // Admin user signup (only default admin can create)
router.post('/login', authController.login); // User login
router.post('/logout', authController.logout); // User logout

module.exports = router;
