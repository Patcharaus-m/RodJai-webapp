import { IUser } from '../../types/user';
import { User } from '../../model/user';
import bcrypt from 'bcryptjs';

export const register = async (body: any, ip: string): Promise<ITypeReturnResponse<IUser | null>> => {
  try {
    const { username, email, password, consent } = body;

    // เช็ค User ซ้ำก่อน (ป้องกัน Error จาก Database)
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return {
        code: 400,
        status: 400,
        error: "Username or Email already exists",
        payload: null
      };
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
