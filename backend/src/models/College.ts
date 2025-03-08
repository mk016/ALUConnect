import mongoose from 'mongoose';
import { BaseUser, IBaseUser } from './BaseUser';

export interface ICollege extends IBaseUser {
  collegeType: 'public' | 'private' | 'autonomous';
  website: string;
  address: {
    street: string;
    city: string;
    state: string;
    country: string;
    zipCode: string;
  };
  contactEmail: string;
  contactPhone: string;
  departments: string[];
  establishedYear: number;
  accreditation?: string;
  rankings?: Array<{
    year: number;
    rank: number;
    organization: string;
  }>;
}

const collegeSchema = new mongoose.Schema({
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
      validator: (v: string) => {
        try {
          new URL(v);
          return true;
        } catch (err) {
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
      validator: (v: number) => v > 1800 && v <= new Date().getFullYear(),
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
        validator: (v: number) => v > 1800 && v <= new Date().getFullYear(),
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

export const College = BaseUser.discriminator<ICollege>('College', collegeSchema); 