import jwt from "./Jwt";
import type { RegisterUserInput } from "../validation";
import userService from "../services/User";
import bcrypt from "bcrypt";
import { Prisma } from "@prisma/client";

class AuthService {
  private readonly jwt;
  private readonly userService;

  constructor() {
    this.jwt = jwt;
    this.userService = userService;
  }

  async register(data: RegisterUserInput) {
    const { accessToken, refreshToken } = this.jwt.generateToken(data);

    const userData = await this.userService.createUser({
      ...data,
      refresh_token: refreshToken,
      password: await bcrypt.hash(data.password, 10),
    });

    return {
      accessToken,
      data: userData,
    };
  }

  login() {}

  logout() {}

  async refresh(refreshToken: string | undefined) {
    if (!refreshToken) throw new Error("Forbidden");

    const user = await this.userService.getUserByKeys({
      refresh_token: refreshToken,
    });

    if (!user) throw new Error("Forbidden");

    const decoded = await this.jwt.verify(user.refresh_token, "refresh");

    if (!decoded || decoded.email !== user.email) throw new Error("Forbidden");

    const { accessToken } = this.jwt.generateToken({ email: user.email });

    return accessToken;
  }
}

const authService = new AuthService();

export default authService;
