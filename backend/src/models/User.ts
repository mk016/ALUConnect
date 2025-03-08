import mongoose, { Document, Model, CallbackError } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  userType: 'alumni' | 'student' | 'college';
  collegeId?: mongoose.Types.ObjectId;
  graduationYear?: string;
  major?: string;
  currentCompany?: string;
  currentPosition?: string;
  skills?: string[];
  bio?: string;
  linkedin?: string;
  github?: string;
  studentId?: string;
  website?: string;
  location?: string;
  collegeType?: 'public' | 'private' | 'autonomous';
  comparePassword(candidatePassword: string): Promise<boolean>;
}

interface IUserModel extends Model<IUser> {
  build(attrs: IUser): IUser;
}

const userSchema = new mongoose.Schema({
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
  userType: {
    type: String,
    enum: {
      values: ['alumni', 'student', 'college'],
      message: '{VALUE} is not a valid user type',
    },
    required: [true, 'User type is required'],
  },
  collegeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'College',
    required: function(this: IUser) {
      return this.userType === 'student' || this.userType === 'alumni';
    },
    validate: {
      validator: function(this: IUser, v: any) {
        if (this.userType === 'student' || this.userType === 'alumni') {
          return mongoose.Types.ObjectId.isValid(v);
        }
        return true;
      },
      message: 'Invalid College ID'
    }
  },
  graduationYear: {
    type: String,
    validate: {
      validator: function(this: IUser, v: string) {
        if (this.userType === 'student' || this.userType === 'alumni') {
          return /^\d{4}$/.test(v);
        }
        return true;
      },
      message: 'Graduation year must be a valid year'
    }
  },
  major: {
    type: String,
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
  skills: {
    type: [String],
    validate: {
      validator: function(v: string[]) {
        return Array.isArray(v);
      },
      message: 'Skills must be an array of strings'
    }
  },
  bio: {
    type: String,
    trim: true,
  },
  linkedin: {
    type: String,
    trim: true,
    validate: {
      validator: function(v: string) {
        if (!v) return true;
        return v.startsWith('https://www.linkedin.com/');
      },
      message: 'LinkedIn URL must start with https://www.linkedin.com/'
    }
  },
  github: {
    type: String,
    trim: true,
    validate: {
      validator: function(v: string) {
        if (!v) return true;
        return v.startsWith('https://github.com/');
      },
      message: 'GitHub URL must start with https://github.com/'
    }
  },
  studentId: {
    type: String,
    trim: true,
    validate: {
      validator: function(this: IUser, v: string) {
        if (this.userType === 'student') {
          return v && v.length > 0;
        }
        return true;
      },
      message: 'Student ID is required for student users'
    }
  },
  website: {
    type: String,
    trim: true,
    validate: {
      validator: function(v: string) {
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
  location: {
    type: String,
    trim: true,
  },
  collegeType: {
    type: String,
    enum: {
      values: ['public', 'private', 'autonomous'],
      message: '{VALUE} is not a valid college type'
    },
    validate: {
      validator: function(this: IUser, v: string) {
        if (this.userType === 'college') {
          return v && v.length > 0;
        }
        return true;
      },
      message: 'College type is required for college users'
    }
  },
}, {
  timestamps: true
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error as CallbackError);
  }
});

// Method to compare password
userSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model<IUser, IUserModel>('User', userSchema);

export default User; 