import mongoose, { Document } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IBaseUser extends Document {
  name: string;
  email: string;
  password: string;
  bio?: string;
  location?: string;
  profilePicture?: string;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const baseUserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters'],
  },
  bio: {
    type: String,
    trim: true,
  },
  location: {
    type: String,
    trim: true,
  },
  profilePicture: {
    type: String,
    trim: true,
  }
}, {
  timestamps: true,
  discriminatorKey: 'userType' // This allows us to create different user types
});

// Hash password before saving
baseUserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error: any) {
    next(error);
  }
});

baseUserSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

// Export the model only if it hasn't been compiled yet
export const BaseUser = mongoose.models.User || mongoose.model<IBaseUser>('User', baseUserSchema); 