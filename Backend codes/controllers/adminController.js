const { User, Doctor, Patient } = require('../models/user');


const addDoctor = async (req, res) => {
    const { name, email, phone, expertise, specialty } = req.body;

    if (!email || !name || !phone || !expertise || !specialty) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const existingDoctor = await User.findOne({ email });
        if (existingDoctor) return res.status(400).json({ message: 'Doctor already exists' });

        const newDoctorUser = new User({name,email, phone, role: 'doctor', expertise,specialty });
        await newDoctorUser.save();

        const newDoctor = new Doctor({ user: newDoctorUser._id, expertise, specialty });
        await newDoctor.save();

        res.status(201).json({ message: 'Doctor added successfully', doctor: newDoctor });
    } catch (error) {
        res.status(500).json({ error: 'Error adding doctor: ' + error.message });
    }
};


const retireDoctor = async (req, res) => {
    try {
        const doctor = await User.findById(req.params.id);
        if (!doctor || doctor.role !== 'doctor') {
            return res.status(404).json({ message: 'Doctor not found' });
        }

        doctor.isRetired = true;
        await doctor.save();

        res.status(200).json({ message: 'Doctor retired successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error retiring doctor: ' + error.message });
    }
};

const removeDoctor = async (req, res) => {
    try {
        const doctor = await Doctor.findOneAndDelete({ user: req.params.id }); 
        if (!doctor) {
            return res.status(404).json({ message: 'Doctor not found' });
        }

        await User.findByIdAndDelete(req.params.id); 
        res.status(200).json({ message: 'Doctor removed successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error removing doctor: ' + error.message });
    }
};
const removePatient = async (req, res) => {
    try {
        const patient = await Patient.findOneAndDelete({ user: req.params.id }); // Delete from Patient model first
        if (!patient) {
            return res.status(404).json({ message: 'Patient not found' });
        }

        await User.findByIdAndDelete(req.params.id); // Delete the associated user
        res.status(200).json({ message: 'Patient removed successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error removing patient: ' + error.message });
    }
};


// Get a single patient by ID
const getPatientById = async (req, res) => {
    try {
        const patient = await User.findById(req.params.id).select('name email phone age'); // Find patient by ID

        if (!patient || patient.role !== 'patient') {
            return res.status(404).json({ message: 'Patient not found' });
        }

        res.status(200).json(patient); // Return the patient details if found
    } catch (error) {
        res.status(500).json({ error: 'Error fetching patient: ' + error.message });
    }
};

// Get a single doctor by ID
const getDoctorById = async (req, res) => {
    try {
        const doctor = await User.findById(req.params.id).select('name email phone expertise specialty');
        if (!doctor || doctor.role !== 'doctor') {
            return res.status(404).json({ message: 'Doctor not found' });
        }

        res.status(200).json(doctor); // Return the doctor details if found
    } catch (error) {
        res.status(500).json({ error: 'Error fetching doctor: ' + error.message });
    }
};


const getAllDoctors = async (req, res) => {
    try {
        const doctors = await User.find({ role: 'doctor' }).select('name email expertise isRetired phone');
        res.status(200).json(doctors);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching doctors: ' + error.message });
    }
};

const getAllPatients = async (req, res) => {
    try {
        const patients = await User.find({ role: 'patient' }).select('name email phone age');
        res.status(200).json(patients);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching patients: ' + error.message });
    }
};

module.exports = {
    addDoctor,
    retireDoctor,
    removeDoctor,
    removePatient,
    getPatientById,
    getDoctorById,
    getAllDoctors,
    getAllPatients
};