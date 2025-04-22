import { NextFunction, Request, Response } from "express";

import authService from "../services/Auth";

class AuthController {
  private readonly authService;

  constructor() {
    this.authService = authService;
  }

  async register(request: Request, response: Response, next: NextFunction) {
    try {
      const userData = await this.authService.register(request.body);

      response
        .status(201)
        .cookie("jwt", userData.data.refresh_token, {
          httpOnly: true,
          maxAge: 24 * 60 * 60 * 1000,
          sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
          secure: process.env.NODE_ENV === "production",
        })
        .json({
          success: true,
          data: {
            ...userData.data,
            accessToken: userData.accessToken,
          },
        });
    } catch (error) {
      next(error);
    }
  }
}

const authController = new AuthController();

export default authController;
