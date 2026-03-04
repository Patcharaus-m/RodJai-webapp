import axios from 'axios';
import qs from 'qs';
import jwt from 'jsonwebtoken';
import { User } from '../../model/user';

export const lineCallback = async (req: any, res: any) => {
  const { code } = req.query; // รับ Code จาก URL [cite: 2026-03-04]

  try {
    // 1. แลก Access Token [cite: 2026-03-04]
    const tokenResponse = await axios.post('https://api.line.me/oauth2/v2.1/token', 
      qs.stringify({
        grant_type: 'authorization_code',
        code,
        redirect_uri: process.env.LINE_CALLBACK_URL,
        client_id: process.env.LINE_CHANNEL_ID,
        client_secret: process.env.LINE_CHANNEL_SECRET
      }), { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } });

    const { access_token } = tokenResponse.data;

    // 2. ขอข้อมูลโปรไฟล์ [cite: 2026-03-04]
    const profile = await axios.get('https://api.line.me/v2/profile', {
      headers: { Authorization: `Bearer ${access_token}` }
    });

    const { userId, displayName, pictureUrl } = profile.data;

    // 3. จัดการ Database [cite: 2026-03-04]
    let user = await User.findOne({ line_user_id: userId });
    if (!user) {
      user = new User({ username: displayName, line_user_id: userId, profile_image: pictureUrl });
      await user.save();
    }

    // 4. ออก JWT Token (เหมือนใน Login ปกติ) [cite: 2026-03-04]
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, { expiresIn: '1d' });

    // 5. ส่งกลับไปหน้าบ้าน (ใช้ Redirect พายูสเซอร์กลับไป) [cite: 2026-03-04]
    res.redirect(`${process.env.FRONTEND_URL}/login-success?token=${token}`);
  } catch (err) {
    console.error('LINE Login Error:', err);
    res.redirect(`${process.env.FRONTEND_URL}/login?error=line_failed`);
  }
};