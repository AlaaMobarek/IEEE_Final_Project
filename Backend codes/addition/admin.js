const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const adminSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, match: /.+\@.+\..+/ },
    password: { 
        type: String, 
        required: true, 
        minlength: 8
    },
    phone: { 
        type: String, 
        required: true,
        match: /^[0-9]{10}$/
    },
    role: { type: String, default: 'admin' },
});

adminSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

const Admin = mongoose.model('Admin', adminSchema);

const createDefaultAdmin = async () => {
    try {
        const defaultAdmin = {
            name: 'Default Admin',
            email: 'admin@example.com',
            password: 'Admin123!',
            phone: '1234567890',
        };

        const existingAdmin = await Admin.findOne({ email: defaultAdmin.email });
        if (!existingAdmin) {
            await Admin.create(defaultAdmin);
            console.log('Default admin created successfully');
        }
    } catch (error) {
        console.error('Error creating default admin:', error.message);
    }
};

module.exports = { Admin, createDefaultAdmin };