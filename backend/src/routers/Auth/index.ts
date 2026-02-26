import { Router } from "express";
import resFunc from "./resFunc";

const router = Router();

router.post("/register", resFunc.register);
router.post("/login", resFunc.login);

export default router;