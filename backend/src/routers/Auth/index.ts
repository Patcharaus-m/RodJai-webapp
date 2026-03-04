import { Router } from "express";
import resFunc from "./resFunc";
import controllers from "../../controllers/Auth";


const router = Router();

router.get('/line/callback', controllers.lineCallback);
router.get('/google/callback', controllers.googleCallback);
router.post("/register", resFunc.register);
router.post("/login", resFunc.login);

export default router;