import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    studentId: {
      type: String,
      unique: true,
      sparse: true,
    },
    university: {
      type: String,
      default: '',
    },
    department: {
      type: String,
      default: '',
    },
    avatar: {
      type: String,
      default: null,
    },
    stressLevel: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    mentalHealthScore: {
      type: Number,
      default: 100,
      min: 0,
      max: 100,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model('User', userSchema);
