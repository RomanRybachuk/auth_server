import { z } from "zod";
import { Request, Response, NextFunction } from "express";

export function validateRequest(validationSchema: z.Schema) {
  return function (request: Request, response: Response, next: NextFunction) {
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
