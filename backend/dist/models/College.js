"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.College = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const BaseUser_1 = require("./BaseUser");
const collegeSchema = new mongoose_1.default.Schema({
    collegeType: {
        type: String,
        enum: {
            values: ['public', 'private', 'autonomous'],
            message: '{VALUE} is not a valid college type'
        },
        required: [true, 'College type is required']
    },
    website: {
        type: String,
        required: [true, 'Website is required'],
        trim: true,
        validate: {
            validator: (v) => {
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
    },
    address: {
        street: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        country: { type: String, required: true },
        zipCode: { type: String, required: true }
    },
    contactEmail: {
        type: String,
        required: [true, 'Contact email is required'],
        lowercase: true,
        trim: true,
    },
    contactPhone: {
        type: String,
        required: [true, 'Contact phone is required'],
        trim: true,
    },
    departments: [{
            type: String,
            required: true,
            trim: true,
        }],
    establishedYear: {
        type: Number,
        required: [true, 'Established year is required'],
        validate: {
            validator: (v) => v > 1800 && v <= new Date().getFullYear(),
            message: 'Established year must be valid'
        }
    },
    accreditation: {
        type: String,
        trim: true,
    },
    rankings: [{
            year: {
                type: Number,
                required: true,
                validate: {
                    validator: (v) => v > 1800 && v <= new Date().getFullYear(),
                    message: 'Ranking year must be valid'
                }
            },
            rank: {
                type: Number,
                required: true,
                min: [1, 'Rank must be positive']
            },
            organization: {
                type: String,
                required: true,
                trim: true
            }
        }]
});
exports.College = BaseUser_1.BaseUser.discriminator('College', collegeSchema);
