import { IUser } from '../../types/user';
import { User } from '../../model/user';
import bcrypt from 'bcryptjs';

export const register = async (body: any, ip: string): Promise<ITypeReturnResponse<IUser | null>> => {
  try {
    const { username, email, password, consent } = body;

    // เช็ค User ซ้ำก่อน (ป้องกัน Error จาก Database)
    const normalizedEmail = email.trim().toLowerCase();
    const existingUser = await User.findOne({ $or: [{ email: normalizedEmail }, { username }] });
    if (existingUser) {
      return {
        code: 400,
        status: 400,
        error: "Username or Email already exists",
        payload: null
      };
    }
    if (!username || !username.trim()) {
      return {
        code: 400, error: "Please enter your username.",
        status: 400,
        payload: null
      };
    }
    if (username.trim().length < 3){
      return {
        code: 400,
        error: "Username must be at least 3 characters long.",
        status: 400,
        payload: null
      };
    }
    if (username.trim().length > 30){
      return {
        code: 400,
        error: "Username must be at most 30 characters long.",
        status: 400,
        payload: null
      };
    }
    if (!email || !email.trim()){
      return {
        code: 400,
        error: "Please enter your email.",
        status: 400,
        payload: null
      };
    }

    if (!password || !password.trim()){
      return {
        code: 400,
        error: "Please enter your password.",
        status: 400,
        payload: null
      }
    }

    if (password.length < 6){
      return {
        code: 400,
        status: 400,
        error: "Password must be at least 6 characters long.",
        payload: null
      }
    }

    if (password.length > 30){
      return {
        code: 400,
        status: 400,
        error: "Password must be at most 30 characters long.",
        payload: null
      }
    }

    if (!consent){
      return {
        code: 400,
        status: 400,
        error: "Please agree to the Terms of Service.",
        payload: null
      }
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password_hash: hashedPassword,
      terms_agreement: {
        consent,
        ip_address: ip // เก็บ IP เป็นหลักฐานตามที่คุณออกแบบไว้
      }
    });

    const savedUser = await newUser.save();
    
    return {
      code: 201,
      status: 201,
      error: null,
      payload: savedUser.toObject() as IUser
    };
  } catch (err: any) {
    return {
      code: 500,
      status: 500,
      error: err.message,
      payload: null
    };
  }
};
