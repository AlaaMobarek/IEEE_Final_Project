const express = require('express');
const router = express.Router();
const systController = require('../controllers/systController');
const authMiddleware = require('../middleware/authMiddleware');

// System routes - protected by authentication and admin/system responsible role
router.get('/best-doctors',authMiddleware.checkSystemResponsible, systController.getBestDoctors);
router.get('/feedback', authMiddleware.checkSystemResponsible, systController.getFeedback);
router.post('/add-feedback',authMiddleware.checkSystemResponsible, systController.addFeedback);
router.get('/get_about',authMiddleware.checkSystemResponsible, systController.getAbout);
router.put('/update_about',authMiddleware.checkSystemResponsible, systController.updateAbout);
router.post('/create_about',authMiddleware.checkSystemResponsible, systController.createAbout);

module.exports = router;
