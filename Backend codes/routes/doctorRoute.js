const express = require('express');
const router = express.Router();
const doctorController = require('../controllers/doctorController');
const authMiddleware = require('../middleware/authMiddleware');

// Doctor routes 
router.put('/update-profile', authMiddleware.checkDoctor, doctorController.updateDoctorProfile);
router.get('/patients', authMiddleware.checkDoctor, doctorController.getAllPatientsForDoctor);
router.get('/patient/:name', authMiddleware.checkDoctor, doctorController.getPatientByName);

module.exports = router;
