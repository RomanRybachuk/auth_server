import jwt from "jsonwebtoken";
import {
  JWT_REFRESH_TOKEN_SECRET,
  JWT_REFRESH_TOKEN_EXPIRY,
  JWT_ACCESS_TOKEN_SECRET,
  JWT_ACCESS_TOKEN_EXPIRY,
} from "../../config";

class JWTService {
  generateToken(options: { [key: string]: any }) {
    const accessToken = jwt.sign(options, JWT_ACCESS_TOKEN_SECRET as any, {
      expiresIn: JWT_ACCESS_TOKEN_EXPIRY as any,
    });

    const refreshToken = jwt.sign(options, JWT_REFRESH_TOKEN_SECRET as any, {
      expiresIn: JWT_REFRESH_TOKEN_EXPIRY as any,
    });

    return { accessToken, refreshToken };
  }

  verify() {}
}

const jwtService = new JWTService();

export default jwtService;
