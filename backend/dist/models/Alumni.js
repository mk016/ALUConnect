"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Alumni = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const BaseUser_1 = require("./BaseUser");
const alumniSchema = new mongoose_1.default.Schema({
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
    currentCompany: {
        type: String,
        trim: true,
    },
    currentPosition: {
        type: String,
        trim: true,
    },
    experience: [{
            company: { type: String, required: true },
            position: { type: String, required: true },
            startDate: { type: Date, required: true },
            endDate: Date,
            description: String
        }],
    skills: [{
            type: String,
            trim: true,
        }],
    linkedin: {
        type: String,
        trim: true,
        validate: {
            validator: (v) => !v || v.startsWith('https://www.linkedin.com/'),
            message: 'LinkedIn URL must start with https://www.linkedin.com/'
        }
    },
    github: {
        type: String,
        trim: true,
        validate: {
            validator: (v) => !v || v.startsWith('https://github.com/'),
            message: 'GitHub URL must start with https://github.com/'
        }
    },
    website: {
        type: String,
        trim: true,
        validate: {
            validator: (v) => {
                if (!v)
                    return true;
                try {
                    new URL(v);
                    return true;
                }
                catch (err) {
                    return false;
                }
            },
            message: 'Website must be a valid URL'
        }
    }
});
exports.Alumni = BaseUser_1.BaseUser.discriminator('Alumni', alumniSchema);
