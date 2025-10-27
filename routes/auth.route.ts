import { Router } from "express";
import * as authController from "../controller/auth.controller"

const router = Router();

router.get("/check", authController.check)

export default router