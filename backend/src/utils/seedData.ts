import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';
import User from '../models/User';
import connectDB from '../config/db';

// Load env vars
dotenv.config();

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
    await connectDB();

    // Clear existing data
    await User.deleteMany({});
    console.log('Existing users deleted'.red);

    // Insert new data
    const createdUsers = await User.create(users);
    console.log('Sample users created:'.green);
    createdUsers.forEach(user => {
      console.log(`- ${user.name} (${user.userType})`.cyan);
    });

    console.log('Data seeding completed! 🌱'.green.bold);
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:'.red.bold);
    console.error(error instanceof Error ? error.message.red : 'Unknown error');
    process.exit(1);
  }
};

// Run the seeder
seedData(); 