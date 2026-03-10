// src/models/User.ts
import { Schema, model } from 'mongoose';
import { IUser } from '../types/user';

const userSchema = new Schema<IUser>({
  username: { type: String, required: true, unique: true },
  email: { type: String, unique: true, sparse: true, default: null },
  password_hash: { type: String, default: null },
  line_user_id: { type: String, default: null },
  subscription: { type: String, enum: ['free', 'premium'], default: 'free' },
  profile_image: { type: String, default: "" },
  terms_agreement: {
    version: { type: String, default: "v1.0" },
    agreed_at: { type: Date, default: Date.now },
    ip_address: { type: String },
    consent: { type: Boolean, default: false }
  }
}, { 
  timestamps: { createdAt: 'created_at', updatedAt: false } 
});

export const User = model<IUser>('User', userSchema);