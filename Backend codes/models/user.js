const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
// User Schema
const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, match: /.+\@.+\..+/ },
    password: { type: String, required: true, minlength: 8 },
    birthDate: { type: String, required: true },
    gender: { type: String, required: true },
    phone: { type: String, required: true, match: /^[0-9]{10}$/ },
    role: { type: String, enum: ['admin', 'doctor', 'patient'], default: 'patient' },
    age: { type: Number, required: true, min: 0 }
});

UserSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

const User = mongoose.model('User', UserSchema);

// Doctor Schema
const doctorSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to User
    expertise: { type: String, required: true },
    isRetired: { type: Boolean, default: false },
    specialty: { type: String, required: true }
});

const Doctor = mongoose.model('Doctor', doctorSchema);

// Patient Schema
const patientSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to User
    disease: [{ type: String, required: true }],
    doctor: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' }]
});

const Patient = mongoose.model('Patient', patientSchema);

module.exports = { User, Doctor, Patient };

const adminSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  //  permissions: { type: [String], default: ['manage_users', 'manage_doctors', 'manage_patients'] },
});

const Admin = mongoose.model('Admin', adminSchema);

const createDefaultAdmin = async () => {
    try {
        const defaultAdminUser = {
            name: 'Default Admin',
            email: 'admin@example.com',
            password: 'Admin123!',
            birthDate: '1990-01-01',
            gender: 'male',
            phone: '1234567890',
            role: 'admin',
            age: 30,
        };
        const existingAdmin = await User.findOne({ email: defaultAdminUser.email });
        if (!existingAdmin) {
            const user = await User.create(defaultAdminUser); 
            const admin = await Admin.create({ user: user._id });
            console.log('Default admin created successfully:', admin);
        }
    } catch (error) {
        console.error('Error creating default admin:', error.message);
    }
};

module.exports = { User, Doctor, Patient, Admin, createDefaultAdmin };