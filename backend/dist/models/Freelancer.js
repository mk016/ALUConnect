"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Freelancer = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const BaseUser_1 = require("./BaseUser");
const freelancerSchema = new mongoose_1.default.Schema({
    skills: [{
            type: String,
            required: true,
            trim: true,
        }],
    hourlyRate: {
        type: Number,
        required: [true, 'Hourly rate is required'],
        min: [0, 'Hourly rate cannot be negative']
    },
    expertise: [{
            type: String,
            required: true,
            trim: true,
        }],
    portfolio: [{
            title: { type: String, required: true },
            description: { type: String, required: true },
            image: String,
            link: String
        }],
    services: [{
            title: { type: String, required: true },
            description: { type: String, required: true },
            price: { type: Number, required: true, min: 0 },
            deliveryTime: { type: Number, required: true, min: 1 }
        }],
    rating: {
        type: Number,
        min: 0,
        max: 5,
        default: 0
    },
    reviews: [{
            userId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User', required: true },
            rating: { type: Number, required: true, min: 1, max: 5 },
            comment: { type: String, required: true },
            date: { type: Date, default: Date.now }
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
    },
    availability: {
        type: Boolean,
        default: true
    }
});
exports.Freelancer = BaseUser_1.BaseUser.discriminator('Freelancer', freelancerSchema);
