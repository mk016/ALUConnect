"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRegistration = void 0;
const validateRegistration = (req, res, next) => {
    const { name, email, password, userType } = req.body;
    if (!name || !email || !password || !userType) {
        return res.status(400).json({
            success: false,
            message: 'Please provide all required fields'
        });
    }
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({
            success: false,
            message: 'Please provide a valid email address'
        });
    }
    // Validate password strength
    if (password.length < 6) {
        return res.status(400).json({
            success: false,
            message: 'Password must be at least 6 characters long'
        });
    }
    // Validate user type
    const validUserTypes = ['student', 'alumni', 'college', 'freelancer'];
    if (!validUserTypes.includes(userType)) {
        return res.status(400).json({
            success: false,
            message: 'Invalid user type'
        });
    }
    next();
};
exports.validateRegistration = validateRegistration;
