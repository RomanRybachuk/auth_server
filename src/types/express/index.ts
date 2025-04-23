import { Request, Response } from "express";
import { JWTPayload } from "../";

export interface IRequest extends Request {
  user?: JWTPayload;
}

export interface IResponse extends Response {}
