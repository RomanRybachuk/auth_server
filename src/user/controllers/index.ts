import { NextFunction, Request, Response } from "express";
import { IRequest } from "../../types/express";

import authService from "../services/Auth";

class AuthController {
  private readonly authService;

  constructor() {
    this.authService = authService;
  }

  async getAuth(request: IRequest, response: Response, next: NextFunction) {
    try {
      if (!request.user) {
        throw new Error("Unauthorized");
      }

      response.status(200).json({ success: true, data: request.user });
    } catch (error) {
      next(error);
    }
  }

  async refresh(request: Request, response: Response, next: NextFunction) {
    try {
      const accessToken = await this.authService.refresh(request.cookies.jwt);

      response.status(200).json({ success: true, data: accessToken });
    } catch (error) {
      next(error);
    }
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
