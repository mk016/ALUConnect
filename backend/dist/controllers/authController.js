"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
const Student_1 = require("../models/Student");
const Alumni_1 = require("../models/Alumni");
const College_1 = require("../models/College");
const Freelancer_1 = require("../models/Freelancer");
// Generate JWT Token
const generateToken = (id) => {
    return jsonwebtoken_1.default.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};
// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
const register = async (req, res) => {
    try {
        const _a = req.body, { userType } = _a, userData = __rest(_a, ["userType"]);
        // Select the appropriate model based on user type
        let UserModel;
        switch (userType) {
            case 'student':
                UserModel = Student_1.Student;
                break;
            case 'alumni':
                UserModel = Alumni_1.Alumni;
                break;
            case 'college':
                UserModel = College_1.College;
                break;
            case 'freelancer':
                UserModel = Freelancer_1.Freelancer;
                break;
            default:
                return res.status(400).json({
                    success: false,
                    message: 'Invalid user type'
                });
        }
        // Check if user already exists
        const existingUser = await UserModel.findOne({ email: userData.email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'User already exists with this email'
            });
        }
        // Create new user
        const user = new UserModel(userData);
        await user.save();
        // Generate JWT token
        const token = jsonwebtoken_1.default.sign({ id: user._id, userType }, process.env.JWT_SECRET || 'your_jwt_secret', { expiresIn: '30d' });
        // Remove password from response
        const userObject = user.toObject();
        delete userObject.password;
        res.status(201).json({
            success: true,
            token,
            user: userObject
        });
    }
    catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({
            success: false,
            message: error instanceof Error ? error.message : 'Registration failed'
        });
    }
};
exports.register = register;
// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        // Check for user email
        const user = await User_1.default.findOne({ email });
        if (user && (await user.comparePassword(password))) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                userType: user.userType,
                token: generateToken(user._id),
            });
        }
        else {
            res.status(401).json({ error: 'Invalid email or password' });
        }
    }
    catch (error) {
        res.status(400).json({ error: error instanceof Error ? error.message : 'Unknown error' });
    }
};
exports.login = login;
