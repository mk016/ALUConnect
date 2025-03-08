import mongoose from 'mongoose';
import { BaseUser, IBaseUser } from './BaseUser';

export interface IFreelancer extends IBaseUser {
  skills: string[];
  hourlyRate: number;
  expertise: string[];
  portfolio: Array<{
    title: string;
    description: string;
    image?: string;
    link?: string;
  }>;
  services: Array<{
    title: string;
    description: string;
    price: number;
    deliveryTime: number;
  }>;
  rating?: number;
  reviews?: Array<{
    userId: mongoose.Types.ObjectId;
    rating: number;
    comment: string;
    date: Date;
  }>;
  linkedin?: string;
  github?: string;
  website?: string;
  availability: boolean;
}

const freelancerSchema = new mongoose.Schema({
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
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true },
    date: { type: Date, default: Date.now }
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
  },
  availability: {
    type: Boolean,
    default: true
  }
});

export const Freelancer = BaseUser.discriminator<IFreelancer>('Freelancer', freelancerSchema); 