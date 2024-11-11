import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { IUserMongo } from '@/interfaces/user.interface';

const userSchema = new mongoose.Schema<IUserMongo>(
  {
    username: {
      type: String,
      trim: true,
      minlength: 3,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    userInactiveDate: {
      type: Date,
      default: null,
    },
    lastLoginAt: {
      type: Date,
      default: null,
    },
    refreshToken: {
      type: String,
      default: null,
    },
    resetPasswordToken: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
    versionKey: false, // __v is disabled
  },
);

// userSchema.set('versionKey', 'version'); // set the version key __v with name of version

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.matchPassword = async function (enteredPassword: string): Promise<boolean> {
  return bcrypt.compare(enteredPassword, this.password);
};

export const User = mongoose.model<IUserMongo>('user', userSchema);
