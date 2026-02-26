import { IUser } from '../../types/user';
import { User } from '../../model/user';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const login = async (body: any): Promise<ITypeReturnResponse<{ token: string; user: IUser } | null>> => {
  try {
    const { email, password } = body;
    
    // หา User และดึงข้อมูลมาตรวจสอบ
    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password_hash))) {
      return {
        code: 401,
        status: 401,
        error: "Invalid email or password",
        payload: null
      };
    }

    // ออก Token โดยใช้ Secret Key จาก .env
    const token = jwt.sign(
      { id: user._id, subscription: user.subscription }, 
      process.env.JWT_SECRET || 'your_fallback_secret', 
      { expiresIn: '1d' }
    );

    return {
      code: 200,
      status: 200,
      error: null,
      payload: { 
        token, 
        user: user.toObject() as IUser
      }
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
