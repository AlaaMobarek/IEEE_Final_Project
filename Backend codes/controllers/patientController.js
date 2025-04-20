const { User, Doctor, Patient } = require('../models/user');

// Get all available doctors by specialty or expertise
const getAllAvailableDoctors = async (req, res) => {
    const { specialty, expertise } = req.query; // These can be passed as query parameters

    try {
        let query = { role: 'doctor' };

        if (specialty) {
            query.specialty = specialty; // Filter by specialty if provided
        }

        if (expertise) {
            query.expertise = expertise; // Filter by expertise if provided
        }

        // Fetch doctors based on the query parameters
        const doctors = await Doctor.find(query).populate('user');
        
        if (doctors.length === 0) {
            return res.status(404).json({ message: 'No doctors found based on your search' });
        }

        res.status(200).json(doctors);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching doctors: ' + error.message });
    }
};

// Update patient information
const updatePatientInfo = async (req, res) => {
    const { name, birthDate, email, phone, disease } = req.body;

    try {
        // Update the patient's info
        const updatedPatient = await Patient.findOneAndUpdate(
            { user: req.user.id },
            { name, birthDate, email, phone, disease },
            { new: true } // Return updated document
        );

        if (!updatedPatient) {
            return res.status(404).json({ message: 'Patient not found' });
        }

        res.status(200).json({ message: 'Patient info updated successfully', updatedPatient });
    } catch (error) {
        res.status(500).json({ error: 'Error updating patient info: ' + error.message });
    }
};

const getDoctorByName = async (req, res) => {
    const { name } = req.params; // Retrieve the doctor's name from the request parameters

    try {
        // Find the doctor by name (case-insensitive search)
        const doctor = await Doctor.findOne({ 'user.name': { $regex: name, $options: 'i' } })
            .populate('user'); // Populate the User data to get the full details of the doctor

        if (!doctor) {
            return res.status(404).json({ message: 'Doctor not found' });
        }

        res.status(200).json(doctor); // Return the doctor details
    } catch (error) {
        res.status(500).json({ error: 'Error fetching doctor by name: ' + error.message });
    }
};

module.exports = {
    getAllAvailableDoctors,
    getDoctorByName,
    updatePatientInfo,
};
