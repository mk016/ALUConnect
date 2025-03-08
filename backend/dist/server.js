"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = __importDefault(require("./config/db"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
// Load env vars
dotenv_1.default.config();
const app = (0, express_1.default)();
// Connect to database
(async () => {
    try {
        await (0, db_1.default)();
        console.log('✅ MongoDB Connected Successfully!');
    }
    catch (error) {
        console.error('❌ MongoDB Connection Error:');
        console.error(error instanceof Error ? error.message : 'Unknown error');
        process.exit(1);
    }
})();
// Middleware
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// CORS middleware
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Accept, Origin');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    // Handle preflight requests
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
});
// Routes
app.use('/api/auth', authRoutes_1.default);
// Test route
app.get('/test', (req, res) => {
    res.json({ message: 'Server is working!' });
});
// Error handling
app.use((err, req, res, next) => {
    console.error('Server Error:', err.stack);
    res.status(500).json({ success: false, error: 'Server Error' });
});
// 404 handler
app.use((req, res) => {
    res.status(404).json({ success: false, error: 'Route not found' });
});
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
    console.log(`Mode: ${process.env.NODE_ENV || 'development'}`);
});
// Handle server errors
server.on('error', (error) => {
    if (error.code === 'EADDRINUSE') {
        console.error(`❌ Port ${PORT} is already in use`);
        process.exit(1);
    }
    console.error('❌ Server error:', error);
});
// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
    console.log('Unhandled Rejection! 💥 Shutting down...'.red);
    console.log(err.name, err.message);
    server.close(() => {
        process.exit(1);
    });
});
// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
    console.log('Uncaught Exception! 💥 Shutting down...'.red);
    console.log(err.name, err.message);
    server.close(() => {
        process.exit(1);
    });
});
process.on('SIGTERM', () => {
    console.info('SIGTERM signal received.'.yellow);
    server.close(() => {
        console.log('Server closed'.yellow);
        process.exit(0);
    });
});
process.on('SIGINT', () => {
    console.info('SIGINT signal received.'.yellow);
    server.close(() => {
        console.log('Server closed'.yellow);
        process.exit(0);
    });
});
