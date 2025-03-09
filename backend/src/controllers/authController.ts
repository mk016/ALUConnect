import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import mongoose, { Model } from 'mongoose';
import User from '../models/User';
import { Student } from '../models/Student';
import { Alumni } from '../models/Alumni';
import { College } from '../models/College';
import { Freelancer } from '../models/Freelancer';


// Generate JWT Token
const generateToken = (id: string): string => {
  return jwt.sign({ id }, process.env.JWT_SECRET!, {
    expiresIn: '30d',
  });
};

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
export const register = async (req: Request, res: Response) => {
  try {
    const { userType, email, password, name } = req.body;

    // Select the appropriate model based on user type
    let UserModel: Model<any>;
    switch (userType) {
      case 'student':
        UserModel = Student;
        break;
      case 'alumni':
        UserModel = Alumni;
        break;
      case 'college':
        UserModel = College;
        break;
      case 'freelancer':
        UserModel = Freelancer;
        break;
      default:
        return res.status(400).json({ 
          success: false, 
          message: 'Invalid user type' 
        });
    }

    // Check if user already exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User already exists with this email'
      });
    }

    // Create new user with minimal required fields
    const user = new UserModel({
      email,
      password,
      name: name || email.split('@')[0], // Use email username as name if not provided
      userType // Important: Set the userType for proper model discrimination
    });

    await user.save({ validateBeforeSave: false }); // Skip validation for optional fields

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, userType },
      process.env.JWT_SECRET || 'your_jwt_secret',
      { expiresIn: '30d' }
    );

    // Remove password from response
    const userObject = user.toObject();
    delete userObject.password;

    res.status(201).json({
      success: true,
      token,
      user: userObject
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : 'Registration failed'
    });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password, userType } = req.body;

    // Select the appropriate model based on user type
    let UserModel: Model<any>;
    switch (userType) {
      case 'student':
        UserModel = Student;
        break;
      case 'alumni':
        UserModel = Alumni;
        break;
      case 'college':
        UserModel = College;
        break;
      case 'freelancer':
        UserModel = Freelancer;
        break;
      default:
        return res.status(400).json({ 
          success: false, 
          message: 'Invalid user type' 
        });
    }

    // Check for user email with the correct user type
    const user = await UserModel.findOne({ email });
    
    if (user && (await user.comparePassword(password))) {
      // Generate token
      const token = jwt.sign(
        { id: user._id, userType },
        process.env.JWT_SECRET || 'your_jwt_secret',
        { expiresIn: '30d' }
      );

      // Remove password from response
      const userObject = user.toObject();
      delete userObject.password;

      res.json({
        success: true,
        token,
        user: userObject
      });
    } else {
      res.status(401).json({ 
        success: false,
        message: 'Invalid email or password'
      });
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(400).json({ 
      success: false,
      message: error instanceof Error ? error.message : 'Login failed'
    });
  }
};

export const updateProfile = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const updates = req.body;

    // Remove sensitive fields that shouldn't be updated directly
    delete updates.password;
    delete updates._id;

    // If updating skills and it's a string, convert to array
    if (typeof updates.skills === 'string') {
      updates.skills = updates.skills.split(',').map((skill: string) => skill.trim());
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { $set: updates },
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error('Profile update error:', error);
    res.status(500).json({ message: 'Error updating profile' });
  }
}; 