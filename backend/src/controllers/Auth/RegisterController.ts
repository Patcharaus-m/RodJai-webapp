import { IUser } from '../../types/user';
import { User } from '../../model/user';
import bcrypt from 'bcryptjs';
import { successRes, errRes } from '../main';

export const register = async (body: any, ip: string): Promise<ITypeReturnResponse<IUser | null>> => {
  try {
    const { username, email, password, consent } = body;

    // เช็ค User ซ้ำก่อน (ป้องกัน Error จาก Database)
    const normalizedEmail = email.trim().toLowerCase();
    const existingUser = await User.findOne({ $or: [{ email: normalizedEmail }, { username }] });
    if (existingUser) {
      return errRes.BAD_REQUEST({ message: "Username or Email already exists" });
    }
    if (!username || !username.trim()) {
      return errRes.BAD_REQUEST({ message: "Please enter your username." });
    }
    if (username.trim().length < 3){
      return errRes.BAD_REQUEST({ message: "Username must be at least 3 characters long." });
    }
    if (username.trim().length > 30){
      return errRes.BAD_REQUEST({ message: "Username must be at most 30 characters long." });
    }
    if (!email || !email.trim()){
      return errRes.BAD_REQUEST({ message: "Please enter your email." });
    }

    if (!password || !password.trim()){
      return errRes.BAD_REQUEST({ message: "Please enter your password." });
    }

    if (password.length < 6){
      return errRes.BAD_REQUEST({ message: "Password must be at least 6 characters long." });
    }

    if (password.length > 30){
      return errRes.BAD_REQUEST({ message: "Password must be at most 30 characters long." });
    }

    if (!consent){
      return errRes.BAD_REQUEST({ message: "Please agree to the Terms of Service." });
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
    
    return successRes(savedUser.toObject() as IUser);
  } catch (err: any) {
    return errRes.INTERNAL_SERVER_ERROR({ message: err.message });
  }
};
