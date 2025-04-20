const mongoose = require("mongoose");

const aboutSchema = new mongoose.Schema({
  departmentName: { type: String, required: true },
  description: { type: String, required: true },
  contactEmail: { type: String, required: true, match: /.+\@.+\..+/ },
  contactPhone: { type: String, required: true },
});

module.exports = mongoose.model("About", aboutSchema);