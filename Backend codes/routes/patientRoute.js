const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientController');
const authMiddleware = require('../middleware/authMiddleware');
// Patient routes 
router.put('/update-profile', authMiddleware.checkPatient,patientController.updatePatientInfo);
router.get('/doctors',  authMiddleware.checkPatient, patientController.getAllAvailableDoctors);
router.get('/doctor/:name',  authMiddleware.checkPatient, patientController.getDoctorByName);
module.exports = router;
