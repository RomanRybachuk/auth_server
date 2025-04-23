import { Router } from "express";
import { verifyAuth } from "../middlewares";

import authRouter from "./Auth";
import usersRouter from "./Users";

const router = Router();

router.use("/users", verifyAuth(), usersRouter);
router.use("/auth", authRouter);

export default router;
