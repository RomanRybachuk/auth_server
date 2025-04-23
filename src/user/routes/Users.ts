import { Router } from "express";
import authController from "../controllers";

const router = Router();

router.get("/getAuth", authController.getAuth.bind(authController));

export default router;
