import { Router } from "express";
import { validateRequest } from "../middlewares";
import { createUserSchema } from "app-fullstack-types/dist";
import authController from "../controllers";

const router = Router();

router.post(
  "/register",
  validateRequest(createUserSchema),
  authController.register.bind(authController)
);

router.post("/refresh", authController.refresh.bind(authController));

export default router;
