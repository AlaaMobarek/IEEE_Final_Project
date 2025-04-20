const Feedback = require('../models/feedback');
const About = require('../models/about');
const User = require('../models/user');

// Get the top 3 doctors based on their rating
const getBestDoctors = async (req, res) => {
    try {
        const bestDoctors = await User.find({ role: 'doctor' })
            .sort({ rating: -1 })
            .limit(3); // Get only top 3 doctors
        res.status(200).json(bestDoctors);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching best doctors: ' + error.message });
    }
};

// Get all feedbacks with patient and doctor details
const getFeedback = async (req, res) => {
    try {
        const feedbacks = await Feedback.find()
            .populate('patientId', 'name email')  // Populate patient information
            .populate('doctorId', 'name email'); // Populate doctor information
        res.status(200).json(feedbacks);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching feedback: ' + error.message });
    }
};

// Add feedback for a doctor from a patient
const addFeedback = async (req, res) => {
    try {
        const { patientId, doctorId, comment, rating } = req.body;

        // Validate if the patient and doctor exist
        const patientExists = await User.exists({ _id: patientId, role: 'patient' });
        const doctorExists = await User.exists({ _id: doctorId, role: 'doctor' });

        if (!patientExists || !doctorExists) {
            return res.status(400).json({ message: 'Invalid patient or doctor ID' });
        }

        // Validate rating (assuming rating should be between 1 and 5)
        if (rating < 1 || rating > 5) {
            return res.status(400).json({ message: 'Rating must be between 1 and 5' });
        }

        const newFeedback = new Feedback({ patientId, doctorId, comment, rating });
        await newFeedback.save();

        res.status(201).json({ message: 'Feedback added successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error adding feedback: ' + error.message });
    }
};

// Get the "about" page information
const getAbout = async (req, res) => {
    try {
        const aboutInfo = await About.findOne(); // Assumes there's only one record
        if (!aboutInfo) {
            return res.status(404).json({ message: 'About information not found' });
        }
        res.status(200).json(aboutInfo); // Return the About information
    } catch (error) {
        res.status(500).json({ error: 'Error fetching about page info: ' + error.message });
    }
};

// Update About Information (Admin Only)
const updateAbout = async (req, res) => {
    try {
        const { departmentName, description, contactEmail, contactPhone } = req.body;

        // Check if the About info exists
        const aboutInfo = await About.findOneAndUpdate(
            {}, // Empty filter to update the first document it finds
            { departmentName, description, contactEmail, contactPhone },
            { new: true } // Return the updated document
        );

        if (!aboutInfo) {
            return res.status(404).json({ message: 'About information not found' });
        }

        res.status(200).json({ message: 'About information updated successfully', aboutInfo });
    } catch (error) {
        res.status(500).json({ error: 'Error updating about page info: ' + error.message });
    }
};

// Create About Information (Admin Only)
const createAbout = async (req, res) => {
    try {
        const { departmentName, description, contactEmail, contactPhone } = req.body;

        const existingAbout = await About.findOne(); // Check if About info exists already
        if (existingAbout) {
            return res.status(400).json({ message: 'About information already exists' });
        }

        const newAbout = new About({
            departmentName,
            description,
            contactEmail,
            contactPhone
        });

        await newAbout.save();

        res.status(201).json({ message: 'About information created successfully', newAbout });
    } catch (error) {
        res.status(500).json({ error: 'Error creating about page info: ' + error.message });
    }
};

const linkPatientToDoctor = async (req, res) => {
    const { doctorName } = req.body; // Doctor's name provided by the system or input

    try {
        // Find the doctor by their name
        const doctor = await Doctor.findOne({ 'user.name': doctorName }).populate('user');

        if (!doctor) {
            return res.status(404).json({ message: 'Doctor not found by the given name' });
        }

        // Find the patient (patient is identified by the logged-in user)
        const patient = await Patient.findOne({ user: req.user.id });

        if (!patient) {
            return res.status(404).json({ message: 'Patient not found' });
        }

        // Link the patient to the selected doctor
        patient.doctor = doctor.user._id;
        await patient.save();

        res.status(200).json({ message: `Patient successfully linked to Dr. ${doctor.user.name}` });
    } catch (error) {
        res.status(500).json({ error: 'Error linking patient to doctor: ' + error.message });
    }
};


module.exports = {
    getBestDoctors,
    getFeedback,
    addFeedback,
    getAbout,
    updateAbout,
    createAbout,
    linkPatientToDoctor 
};
