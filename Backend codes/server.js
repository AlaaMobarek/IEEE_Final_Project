const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');  
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const routes = require('./routes/serverRoutes');
const app = express();
const { createDefaultAdmin } = require('./models/user');
dotenv.config();

// Connect to the database
// connectDB()
//   .then(() => {
//     console.log('Database connected successfully');
//     createDefaultAdmin(); // Create default admin after DB connection
//     console.log('default successfully');
//   })
//   .catch((err) => {
//     console.error('Database connection failed:', err.message);
//     process.exit(1); // Exit the process if DB connection fails
//   });

  mongoose.connect('mongodb+srv://shaimaaahmed05:sh154868@cluster1.3ld7g.mongodb.net/HospitalSystem', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>{ console.log('MongoDB connected');  createDefaultAdmin();})
  .catch(err => console.log(err));



// Middleware
app.use(express.json()); // To parse incoming JSON data
app.use(cors()); // Enable Cross-Origin Request Sharing (CORS) for all domains



// Global Error Handling for uncaught errors
process.on('unhandledRejection', (err) => {
  console.error(`Unhandled Rejection: ${err.message}`);
  process.exit(1); // Exit the process
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
