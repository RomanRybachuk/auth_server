import jwt from "jsonwebtoken";
import {
  JWT_REFRESH_TOKEN_SECRET,
  JWT_REFRESH_TOKEN_EXPIRY,
  JWT_ACCESS_TOKEN_SECRET,
  JWT_ACCESS_TOKEN_EXPIRY,
} from "../../config";
import { JWTPayload } from "../../types";

const tokenSecrets = {
  access: JWT_ACCESS_TOKEN_SECRET,
  refresh: JWT_REFRESH_TOKEN_SECRET,
};

class JWTService {
  generateToken(options: { [key: string]: any }) {
    const accessToken = jwt.sign(
      { email: options.email },
      JWT_ACCESS_TOKEN_SECRET as any,
      {
        expiresIn: JWT_ACCESS_TOKEN_EXPIRY as any,
      }
    );

    const refreshToken = jwt.sign(
      { email: options.email },
      JWT_REFRESH_TOKEN_SECRET as any,
      {
        expiresIn: JWT_REFRESH_TOKEN_EXPIRY as any,
      }
    );

    return { accessToken, refreshToken };
  }

  async verify(
    token: string,
    type: "access" | "refresh" = "access"
  ): Promise<JWTPayload | null> {
    return new Promise((resolve) => {
      jwt.verify(
        token,
        tokenSecrets[type] as any,
        (
          error: jwt.VerifyErrors | null,
          decoded?: jwt.JwtPayload | string | undefined
        ) => {
          if (error) return resolve(null);

          return resolve(decoded as JWTPayload);
        }
      );
    });
  }
}

const jwtService = new JWTService();

export default jwtService;
