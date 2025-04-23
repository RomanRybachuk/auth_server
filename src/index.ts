import express, { Application } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import UserRoute from "./user/routes";
import { CORS_ORIGINS, PORT } from "./config";
import ErrorHandler from "./middlewares/ErrorHandler";

const app: Application = express();

// Middlewares
app.use(cors({ origin: CORS_ORIGINS, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Root route
app.use("/api", UserRoute);

// Handle controller errors
app.use(ErrorHandler);

app.listen(PORT, () => {
  console.log(`Server has been started...`);
});
