import jwt from "./Jwt";
import type { RegisterUserInput } from "../validation";
import userService from "../services/User";
import bcrypt from "bcrypt";

class AuthService {
  private readonly jwt;
  private readonly userService;

  constructor() {
    this.jwt = jwt;
    this.userService = userService;
  }

  async register(data: RegisterUserInput) {
    const { accessToken, refreshToken } = this.jwt.generateToken(data);

    const userData = await this.userService.create({
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
}

const authService = new AuthService();

export default authService;
