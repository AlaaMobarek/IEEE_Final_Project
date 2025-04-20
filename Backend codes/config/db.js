const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    mongoose.connect(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/HospitalSystem`).then(
        () => {
            console.log('Connected to MongoDB');
        }
    ).catch(
        (error) => {
            console.log('Connection failed', error);
        }
    );
};

module.exports = connectDB;
