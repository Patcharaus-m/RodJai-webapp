import controllers from "@/controllers/Auth"; 
import { IUser } from "@/types/user";
import { Request, Response } from "express";

// แยก Function สำหรับสมัครสมาชิก
async function register(
  req: Request,
  res: Response<ITypeReturnResponse<IUser | null>>
) {
  const data = await controllers.register(req.body, req.ip || ""); // ส่ง ip ไปเก็บตาม Schema
  return res.status(data.code).json(data);
}

// แยก Function สำหรับเข้าสู่ระบบ
async function login(
  req: Request,
  res: Response<ITypeReturnResponse<{ token: string; user: IUser } | null>>
) {
  const data = await controllers.login(req.body);
  return res.status(data.code).json(data);
}

// ส่งออกแบบ Default เพื่อให้ Router เรียกใช้ง่ายๆ
export default {
  register,
  login
};