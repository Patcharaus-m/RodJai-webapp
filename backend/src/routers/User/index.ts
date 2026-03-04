import { Router } from "express";
import resFunc from "./resFunc";

const router = Router();

router.use("/", resFunc);

export default router;