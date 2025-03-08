"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const User_1 = __importDefault(require("../models/User"));
const db_1 = __importDefault(require("../config/db"));
// Load env vars
dotenv_1.default.config();
// Sample data
const users = [
    {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
        userType: 'alumni',
        graduationYear: '2020',
        major: 'Computer Science',
        currentCompany: 'Google',
        currentPosition: 'Software Engineer',
        skills: ['JavaScript', 'React', 'Node.js'],
        bio: 'Experienced software engineer with a passion for web development',
        linkedin: 'https://www.linkedin.com/in/johndoe',
        github: 'https://github.com/johndoe',
        location: 'San Francisco, CA'
    },
    {
        name: 'Jane Smith',
        email: 'jane@example.com',
        password: 'password123',
        userType: 'student',
        graduationYear: '2024',
        major: 'Computer Engineering',
        skills: ['Python', 'Java', 'Machine Learning'],
        bio: 'Final year student interested in AI/ML',
        linkedin: 'https://www.linkedin.com/in/janesmith',
        github: 'https://github.com/janesmith',
        studentId: 'ST2024001',
        location: 'Boston, MA'
    },
    {
        name: 'JKLU University',
        email: 'admin@jklu.edu',
        password: 'password123',
        userType: 'college',
        collegeType: 'private',
        website: 'https://www.jklu.edu',
        location: 'Jaipur, Rajasthan'
    }
];
// Seed data function
const seedData = async () => {
    try {
        // Connect to MongoDB
        await (0, db_1.default)();
        // Clear existing data
        await User_1.default.deleteMany({});
        console.log('Existing users deleted'.red);
        // Insert new data
        const createdUsers = await User_1.default.create(users);
        console.log('Sample users created:'.green);
        createdUsers.forEach(user => {
            console.log(`- ${user.name} (${user.userType})`.cyan);
        });
        console.log('Data seeding completed! 🌱'.green.bold);
        process.exit(0);
    }
    catch (error) {
        console.error('Error seeding data:'.red.bold);
        console.error(error instanceof Error ? error.message.red : 'Unknown error');
        process.exit(1);
    }
};
// Run the seeder
seedData();
