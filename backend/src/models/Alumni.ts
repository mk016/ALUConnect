import mongoose from 'mongoose';
import { BaseUser, IBaseUser } from './BaseUser';

export interface IAlumni extends IBaseUser {
  collegeId: mongoose.Types.ObjectId;
  graduationYear: string;
  major: string;
  currentCompany?: string;
  currentPosition?: string;
  experience?: Array<{
    company: string;
    position: string;
    startDate: Date;
    endDate?: Date;
    description?: string;
  }>;
  skills?: string[];
  linkedin?: string;
  github?: string;
  website?: string;
}

const alumniSchema = new mongoose.Schema({
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
      validator: (v: string) => !v || v.startsWith('https://www.linkedin.com/'),
      message: 'LinkedIn URL must start with https://www.linkedin.com/'
    }
  },
  github: {
    type: String,
    trim: true,
    validate: {
      validator: (v: string) => !v || v.startsWith('https://github.com/'),
      message: 'GitHub URL must start with https://github.com/'
    }
  },
  website: {
    type: String,
    trim: true,
    validate: {
      validator: (v: string) => {
        if (!v) return true;
        try {
          new URL(v);
          return true;
        } catch (err) {
          return false;
        }
      },
      message: 'Website must be a valid URL'
    }
  }
});

export const Alumni = BaseUser.discriminator<IAlumni>('Alumni', alumniSchema); 