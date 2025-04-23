import { Router } from "express";
import authController from "../controllers";

const router = Router();

router.get("/verifyUser", authController.verifyUser.bind(authController));

export default router;
