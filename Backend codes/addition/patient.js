const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true, min: 0 }, // Ensure age is a positive number
  email: {    type: String,   required: true,    unique: true, 
    match: /.+\@.+\..+/ // Email format validation
  },
  phone: {   type: String,  required: true, 
    match: /^[0-9]{10}$/ // Phone number validation (adjust for country)
  }
});

module.exports = mongoose.model("Patient", patientSchema);
