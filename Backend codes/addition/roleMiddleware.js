function checkRole(role) {
    return (req, res, next) => {
        if (req.user.role !== role) {
            return res.status(403).json({ message: `Access denied: ${role} only` });
        }
        next();
    };
}

module.exports = {
    checkAdmin: checkRole('admin'),
    checkDoctor: checkRole('doctor'),
    checkPatient: checkRole('patient')
};