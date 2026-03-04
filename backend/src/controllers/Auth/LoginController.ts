import { IUser } from '../../types/user';
import { User } from '../../model/user';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { successRes, errRes } from '../main';

export const login = async (body: any): Promise<ITypeReturnResponse<{ token: string; user: IUser } | null>> => {
  try {
    const { email, password } = body;
    
    // หา User และดึงข้อมูลมาตรวจสอบ
    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password_hash!))) {
      return errRes.UNAUTHORIZED({ message: "Invalid email or password" });
    }

    // ออก Token โดยใช้ Secret Key จาก .env
    const token = jwt.sign(
      { id: user._id, subscription: user.subscription }, 
      process.env.JWT_SECRET || 'your_fallback_secret', 
      { expiresIn: '1d' }
    );

    return successRes({ 
      token, 
      user: user.toObject() as IUser
    });
  } catch (err: any) {
    return errRes.INTERNAL_SERVER_ERROR({ message: err.message });
  }
};
