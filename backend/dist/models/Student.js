"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Student = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const BaseUser_1 = require("./BaseUser");
const studentSchema = new mongoose_1.default.Schema({
    studentId: {
        type: String,
        required: [true, 'Student ID is required'],
        unique: true,
        trim: true,
    },
    collegeId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'College',
        required: [true, 'College ID is required'],
    },
    graduationYear: {
        type: String,
        required: [true, 'Graduation year is required'],
        validate: {
            validator: (v) => /^\d{4}$/.test(v),
            message: 'Graduation year must be a valid year'
        }
    },
    major: {
        type: String,
        required: [true, 'Major is required'],
        trim: true,
    },
    skills: [{
            type: String,
            trim: true,
        }],
    github: {
        type: String,
        trim: true,
        validate: {
            validator: (v) => !v || v.startsWith('https://github.com/'),
            message: 'GitHub URL must start with https://github.com/'
        }
    },
    linkedin: {
        type: String,
        trim: true,
        validate: {
            validator: (v) => !v || v.startsWith('https://www.linkedin.com/'),
            message: 'LinkedIn URL must start with https://www.linkedin.com/'
        }
    },
    projects: [{
            title: { type: String, required: true },
            description: { type: String, required: true },
            link: { type: String }
        }]
});
exports.Student = BaseUser_1.BaseUser.discriminator('Student', studentSchema);
