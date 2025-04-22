import { Router } from "express";
import authController from "../controllers";
import { validateRequest } from "../middlewares";
import { createUserSchema } from "../validation";

const router = Router();

router.use("/user", router);

// Requests
// router.get("/get/:id", getUser);
router.post(
  "/register",
  validateRequest(createUserSchema),
  authController.register.bind(authController)
);
// router.put("/update", updateUser);
// router.delete("/delete", deleteUser);

export default router;
