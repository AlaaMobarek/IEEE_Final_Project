const express = require('express');
const { retireDoctor, removePatient } = require('./hospitalController');
const authenticateToken = require('../middleware/authMiddleware');
const router = express.Router();

router.put('/retireDoctor/:id', authenticateToken, retireDoctor);
router.delete('/removePatient/:id', authenticateToken, removePatient);

module.exports = router;