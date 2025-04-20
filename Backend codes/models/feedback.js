const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    comment: { type: String, required: true },
    rating: {   type: Number,   required: true,  min: 1,    max: 5  },
    createdAt: { type: Date, default: Date.now }
});


feedbackSchema.index({ doctorId: 1, patientId: 1 });

module.exports = mongoose.model('Feedback', feedbackSchema);
