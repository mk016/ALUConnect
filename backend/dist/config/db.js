"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const connectDB = async () => {
    try {
        const mongoURI = process.env.MONGODB_URI;
        if (!mongoURI) {
            throw new Error('MongoDB URI is not defined in environment variables');
        }
        const options = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
            family: 4 // Use IPv4
        };
        await mongoose_1.default.connect(mongoURI);
        mongoose_1.default.connection.on('connected', () => {
            console.log('✅ Database connection established');
        });
        mongoose_1.default.connection.on('error', (err) => {
            console.error('❌ Database connection error:', err.message);
        });
        mongoose_1.default.connection.on('disconnected', () => {
            console.log('⚠️ Database connection lost');
        });
        // Handle process termination
        process.on('SIGINT', async () => {
            try {
                await mongoose_1.default.connection.close();
                console.log('✅ Database connection closed through app termination');
                process.exit(0);
            }
            catch (err) {
                console.error('❌ Error during database disconnection:', err);
                process.exit(1);
            }
        });
    }
    catch (error) {
        console.error('❌ Database connection error:', error instanceof Error ? error.message : 'Unknown error');
        process.exit(1);
    }
};
exports.default = connectDB;
