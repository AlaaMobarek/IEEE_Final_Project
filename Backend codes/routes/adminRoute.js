const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/addDoctor', authMiddleware.verifyToken, authMiddleware.checkAdmin,  adminController.addDoctor);
router.get('/getAllDoctors',  authMiddleware.verifyToken, authMiddleware.checkAdmin, adminController.getAllDoctors);
router.get('/getAllPatients',  authMiddleware.verifyToken, authMiddleware.checkAdmin,  adminController.getAllPatients);
router.put('/retireDoctor/:id',  authMiddleware.verifyToken, authMiddleware.checkAdmin,adminController.retireDoctor);
router.delete('/removeDoctor/:id',  authMiddleware.verifyToken, authMiddleware.checkAdmin, adminController.removeDoctor);
router.delete('/removePatient/:id',  authMiddleware.verifyToken, authMiddleware.checkAdmin, adminController.removePatient);
router.get('/getDoctorById/:id',  authMiddleware.verifyToken, authMiddleware.checkAdmin, adminController.getDoctorById);
router.get('/getPatientById/:id',  authMiddleware.verifyToken, authMiddleware.checkAdmin, adminController.getPatientById);

module.exports = router;
