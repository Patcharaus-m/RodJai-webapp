// src/types/user.ts
import { Document } from 'mongoose';

export interface ITerms {
  version: string;
  agreed_at: Date;
  ip_address: string;
  consent: boolean;
}

export interface IUser extends Document {
  username: string;
  email?: string | null;
  password_hash?: string | null;
  line_user_id?: string;
  subscription: 'free' | 'premium';
  created_at: Date;
  terms_agreement: ITerms;
  profile_image?: string;
}