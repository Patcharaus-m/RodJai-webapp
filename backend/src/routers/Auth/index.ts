import { Router } from "express";
import resFunc from "./resFunc";
import { lineCallback } from "../../controllers/Auth/LineController";

const router = Router();

router.get('/line/callback', lineCallback);
router.post("/register", resFunc.register);
router.post("/login", resFunc.login);

export default router;