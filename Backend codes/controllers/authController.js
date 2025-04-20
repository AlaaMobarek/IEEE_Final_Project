const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Admin = require('../models/user');

const signup = async (req, res) => {
    const { name, email, password, birthDate, gender, phone, role, photo } = req.body;
    
    // Basic validation
    if (!name || !email || !password || !birthDate || !gender || !phone || !role) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        if (role === 'admin') {
            return res.status(403).json({ message: 'Creating admin is not allowed via this route' });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: 'User already exists' });

        const hashedPassword = bcrypt.hashSync(password, 10);
        const newUser = new User({ name, email, password: hashedPassword, birthDate, gender, phone, role, photo });
        await newUser.save();

        res.status(201).json({ message: 'Signup successful' });
    } catch (error) {
        res.status(500).json({ error: 'Error during signup: ' + error.message });
    }
};

const adminSignup = async (req, res) => {
    try {
        // Only allow the default admin to create new admins
        const defaultAdmin = await Admin.findOne({ email: 'admin@example.com' });
        if (!defaultAdmin || req.user.id !== defaultAdmin._id.toString()) {
            return res.status(403).json({ message: 'Only the default admin can create new admins' });
        }

        const { name, email, password, phone } = req.body;

        // Validation
        if (!name || !email || !password || !phone) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) return res.status(400).json({ message: 'Admin already exists' });

        const hashedPassword = bcrypt.hashSync(password, 10);
        const newAdmin = new Admin({ name, email, password: hashedPassword, phone });
        await newAdmin.save();

        res.status(201).json({ message: 'Admin created successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error creating admin: ' + error.message });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;
    
    try {
        let user = await Admin.findOne({ email });
        if (!user) {
            user = await User.findOne({ email });
        }


        if (user && bcrypt.compareSync(password, user.password)) {
            // Generate JWT token
            const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
            
            // Set token as HTTP-Only cookie for security
            res.cookie('token', token, { httpOnly: true, maxAge: 3600000 }); // 1 hour in milliseconds
            res.json({ user, token });
        } else {
            res.status(404).json({ message: 'User not found or incorrect password' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error during login: ' + error.message });
    }
};

const logout = async (req, res) => {
    try {
        res.clearCookie('token');
        res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
        res.status(500).json({ error: 'Error during logout: ' + error.message });
    }
};

module.exports = {
    login,
    signup,
    adminSignup,
    logout
};
