const jwt = require('jsonwebtoken');
const User = require('../models/user');

// Authenticate Token Middleware (JWT Verification)
const verifyToken = (req, res, next) => {
    let token = req.cookies.token || req.headers['authorization']  ;

    if (!token) {
        return res.status(403).send('A token is required for authentication');
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decoded;
    } catch (err) {
        return res.status(401).send('Invalid Token');
    }
    return next();
};

// Middleware to check if the user is authenticated and has the admin or system responsible role
const isAdminOrSystemResponsible = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1]; // Bearer token
        if (!token) {
            return res.status(403).json({ message: 'No token provided' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify JWT
        const user = await User.findById(decoded.id);

        if (!user || (user.role !== 'admin' && user.role !== 'system responsible')) {
            return res.status(403).json({ message: 'Access denied. You are not authorized to perform this action.' });
        }

        req.user = user; // Attach user data to the request
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        res.status(500).json({ error: 'Error during authorization' });
    }
};


// Middleware to check if the user has a specific role
function checkRole(role) {
    return (req, res, next) => {
        if (req.user.role !== role) {
            return res.status(403).json({ message: `Access denied: ${role} only` });
        }
        next();
    };
}


// Export both middlewares
module.exports = {
    verifyToken,
    isAdminOrSystemResponsible,
    checkAdmin: checkRole('admin'),
    checkDoctor: checkRole('doctor'),
    checkPatient: checkRole('patient'),
    checkSystemResponsible: checkRole('system responsible') // Optional: if you want to check for system responsible role

};
