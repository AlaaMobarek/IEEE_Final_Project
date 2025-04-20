const { User, Doctor, Patient } = require('../models/user');

// Update profile of the doctor
const updateDoctorProfile = async (req, res) => {
    const { birthDate, email, phone, expertise, specialty } = req.body;

    // Validate input
    if (!email || !phone || !expertise || !specialty) {
        return res.status(400).json({ message: 'Email, phone, expertise, and specialty are required' });
    }

    try {
        // Update basic profile of the doctor
        const updatedDoctor = await User.findByIdAndUpdate(
            req.user.id,
            { birthDate, email, phone },
            { new: true }
        );

        // Update doctor's expertise and specialty
        const updatedDoctorDetails = await Doctor.findOneAndUpdate(
            { user: req.user.id },
            { expertise, specialty },
            { new: true }
        );

        res.status(200).json({ message: 'Doctor profile updated successfully', updatedDoctor, updatedDoctorDetails });
    } catch (error) {
        res.status(500).json({ error: 'Error updating doctor profile: ' + error.message });
    }
};

// Get all patients linked to this doctor
const getAllPatientsForDoctor = async (req, res) => {
    try {
        // Find doctor
        const doctor = await Doctor.findOne({ user: req.user.id });
        if (!doctor) {
            return res.status(404).json({ message: 'Doctor not found' });
        }

        // Get all patients linked to this doctor
        const patients = await Patient.find({ doctor: doctor._id }).populate('user');
        res.status(200).json(patients);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching patients: ' + error.message });
    }
};

// Get a specific patient by name
const getPatientByName = async (req, res) => {
    try {
        // Find patient by name
        const patient = await User.findOne({ name: req.params.name, role: 'patient' });
        if (!patient) {
            return res.status(404).json({ message: 'Patient not found' });
        }

        res.status(200).json(patient);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching patient by name: ' + error.message });
    }
};

module.exports = {
    updateDoctorProfile,
    getAllPatientsForDoctor,
    getPatientByName
};
