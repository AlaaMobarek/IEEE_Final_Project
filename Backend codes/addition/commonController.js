// sharedController.js

const User = require('../models/user');

// Get all patients
const getAllPatients = async () => {
    return await User.find({ role: 'patient' });
};

// Get all doctors
const getAllDoctors = async () => {
    return await User.find({ role: 'doctor' });
};

module.exports = {
    getAllPatients,
    getAllDoctors
};
