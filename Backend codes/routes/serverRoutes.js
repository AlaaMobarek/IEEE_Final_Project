const express = require('express');
const router = express.Router();

// Import all route files
const authRoutes = require('./authRoute');
const adminRoutes = require('./adminRoute');
const doctorRoutes = require('./doctorRoute');
const patientRoutes = require('./patientRoute');
const systRoutes = require('./systRoute');

// Use the routes
router.use('/auth', authRoutes);
router.use('/admin', adminRoutes);
router.use('/doctor', doctorRoutes);
router.use('/patient', patientRoutes);
router.use('/syst', systRoutes);

module.exports = router;