const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: {   type: String,  required: true, unique: true, 
    match: /.+\@.+\..+/ // Email format validation
  },
  phone: {    type: String, required: true,
       match: /^[0-9]{10}$/ // Phone format validation (customize as needed) 
        },
  expertise: {   type: String, required: true  },
  isRetired: { type: Boolean, default: false },
});

module.exports = mongoose.model("Doctor", doctorSchema);
