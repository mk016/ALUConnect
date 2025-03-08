import mongoose from 'mongoose';
import { BaseUser, IBaseUser } from './BaseUser';

export interface IStudent extends IBaseUser {
  studentId: string;
  collegeId: mongoose.Types.ObjectId;
  graduationYear: string;
  major: string;
  skills?: string[];
  github?: string;
  linkedin?: string;
  projects?: Array<{
    title: string;
    description: string;
    link?: string;
  }>;
}

const studentSchema = new mongoose.Schema({
  studentId: {
    type: String,
    required: [true, 'Student ID is required'],
    unique: true,
    trim: true,
  },
  collegeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'College',
    required: [true, 'College ID is required'],
  },
  graduationYear: {
    type: String,
    required: [true, 'Graduation year is required'],
    validate: {
      validator: (v: string) => /^\d{4}$/.test(v),
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
      validator: (v: string) => !v || v.startsWith('https://github.com/'),
      message: 'GitHub URL must start with https://github.com/'
    }
  },
  linkedin: {
    type: String,
    trim: true,
    validate: {
      validator: (v: string) => !v || v.startsWith('https://www.linkedin.com/'),
      message: 'LinkedIn URL must start with https://www.linkedin.com/'
    }
  },
  projects: [{
    title: { type: String, required: true },
    description: { type: String, required: true },
    link: { type: String }
  }]
});

export const Student = BaseUser.discriminator<IStudent>('Student', studentSchema); 