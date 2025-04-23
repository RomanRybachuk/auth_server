import { z } from "zod";
import { Response, NextFunction } from "express";
import jwtService from "../services/Jwt";
import { IRequest } from "../../types/express";
import { JWTPayload } from "../../types";
import userService from "../services/User";

export function validateRequest(validationSchema: z.Schema) {
  return function (request: IRequest, response: Response, next: NextFunction) {
    try {
      validationSchema.parse(request.body);

      next();
    } catch (error) {
      response
        .status(400)
        .send({ success: false, messages: "Validation error" });
    }
  };
}

export function verifyAuth() {
  return async (
    request: IRequest,
    response: Response,
    next: NextFunction
  ): Promise<any> => {
    const { authorization } = request.headers;

    if (!authorization)
      return response
        .status(401)
        .json({ success: false, message: "Unauthorized" });

    const accessToken = authorization.split(" ")[1];

    if (!accessToken)
      return response
        .status(401)
        .json({ success: false, message: "Unauthorized" });

    const verify = (await jwtService.verify(accessToken)) as JWTPayload;

    if (!verify)
      return response
        .status(401)
        .json({ success: false, message: "Forbidden" });

    const userData = await userService.getUniqueUser({
      email: verify.email,
    });

    if (!userData || userData.email !== verify.email)
      return response
        .status(403)
        .json({ success: false, message: "Forbidden" });

    request.user = userData;

    next();
  };
}
