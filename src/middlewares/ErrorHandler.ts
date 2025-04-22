import { NextFunction, Request, Response } from "express";

export default function ErrorHandler(
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction
) {
  response.status(400).json({ success: false, message: error.message });
}
