import { Router } from "express";
import jwt from "jsonwebtoken";
import { User } from "../../model/user";

const router = Router();

// GET /api/user/me — ดึงข้อมูลผู้ใช้จาก JWT Token
router.get("/me", async (req: any, res: any) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ error: "No token provided" });

    const token = authHeader.split(" ")[1];
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
    const user = await User.findById(decoded.id).select("-password_hash");

    if (!user) return res.status(404).json({ error: "User not found" });

    res.json({ payload: { user } });
  } catch (err) {
    res.status(401).json({ error: "Invalid token" });
  }
});

export default router;
