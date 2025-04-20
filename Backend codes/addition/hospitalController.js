const User = require('../models/user');

const retireDoctor = async (req, res) => {
    try {
        await User.findByIdAndUpdate(req.params.id, { isRetired: true });
        res.status(200).json({ message: 'Doctor retired successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error retiring doctor' });
    }
};

const removePatient = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Patient removed successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error removing patient' });
    }
};

module.exports = {
    retireDoctor,
    removePatient
};