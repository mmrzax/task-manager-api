import { Schema, model } from 'mongoose';
import { compare, hash } from 'bcryptjs';
import isEmail from 'validator/lib/isEmail';
import { sign } from 'jsonwebtoken';
import { IUser, IUserModel, PublicProfile } from '../interfaces/interfaces'; // Import interfaces
import taskModel from './task';

const userSchema = new Schema<IUser, IUserModel>({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
    trim: true,
    validate(value: string) {
      if (!isEmail(value)) {
        throw new Error('Email is invalid!');
      }
    },
  },
  age: {
    type: Number,
    default: 0,
    validate(value: number) {
      if (value < 0) {
        throw new Error('Age must be a postive number!!');
      }
    },
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minLength: 7,
    validate(value: string) {
      if (value.toLowerCase().includes('password')) {
        throw new Error("Using the 'password' word isn't allowed in password");
      }
    },
  },
  tokens: [{
    token: {
      type: String,
      required: true,
    },
  }],
  avatar: {
    type: Buffer,
  },
}, {
  timestamps: true,
});

userSchema.virtual('tasks', {
  ref: 'Task',
  localField: '_id',
  foreignField: 'owner',
});

// Generate JsonWebToken For a User
userSchema.methods.genAuthToken = async function () {
  const _id: string = this._id.toString();
  const token: string = sign({ _id }, process.env.JWT_SECRET!, { expiresIn: '4h' });
  this.tokens = this.tokens.concat({ token });
  await this.save();
  return token;
};

userSchema.methods.toJSON = function () {
  const userObject: PublicProfile = this.toObject();
  delete userObject.password;
  delete userObject.tokens;
  delete userObject.avatar;
  return userObject;
};

// Find a user by email and verify with password
userSchema.statics.findByCredentials = async (email: string, password: string) => {
  const user = await userModel.findOne({ email });
  if (!user) {
    throw new Error('Unable to login');
  }
  const isMatch = await compare(password, user.password);
  if (!isMatch) {
    throw new Error('Unable to login');
  }
  return user;
};

// Hash the password before saving the user
userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await hash(this.password, 8);
  }
  next();
});

// Delete user tasks before deleting user
userSchema.pre('remove', async function (next) {
  await taskModel.deleteMany({ owner: this._id });
  next();
});

// Create an model using mongoose.model
const userModel = model<IUser, IUserModel>('User', userSchema);

export default userModel;
