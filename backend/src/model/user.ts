// src/models/User.ts
import { Schema, model } from 'mongoose';
import { IUser } from '../types/user'; // Import interface เข้ามาใช้

const userSchema = new Schema<IUser>({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password_hash: { type: String, required: true },
  line_user_id: { type: String, default: null },
  subscription: { type: String, enum: ['free', 'premium'], default: 'free' },
  profile_image: { type: String, default: "" },
  terms_agreement: {
    version: { type: String, default: "v1.0" },
    agreed_at: { type: Date, default: Date.now },
    ip_address: { type: String },
    consent: { type: Boolean, required: true }
  }
}, { 
  timestamps: { createdAt: 'created_at', updatedAt: false } 
});

export const User = model<IUser>('User', userSchema);