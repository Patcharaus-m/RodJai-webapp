import axios from 'axios';
import jwt from 'jsonwebtoken';
import { User } from '../../model/user';

export const googleCallback = async (req: any, res: any) => {
  const { code } = req.query; // รับ Code จาก Google [cite: 2026-03-04]
  try {
    // 1. แลก Access Token
    const response = await axios.post('https://oauth2.googleapis.com/token', {
      code,
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      redirect_uri: process.env.GOOGLE_CALLBACK_URL,
      grant_type: 'authorization_code',
    });

    const { access_token } = response.data;

    // 2. ขอข้อมูล Profile
    const userRes = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`);
    const { email, name, picture } = userRes.data;

    // 3. จัดการ Database (หา User หรือสร้างใหม่) [cite: 2026-03-04]
    let user = await User.findOne({ email });
    if (!user) {
      user = new User({ username: name, email, profile_image: picture });
      await user.save();
    }

    // 4. ออก JWT และ Redirect กลับหน้าบ้าน
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, { expiresIn: '1d' });
    res.redirect(`${process.env.FRONTEND_URL}/login-success?token=${token}`);
  } catch (err) {
    console.error('Google Login Error:', err);
    res.redirect(`${process.env.FRONTEND_URL}/login?error=google_failed`);
  }
};