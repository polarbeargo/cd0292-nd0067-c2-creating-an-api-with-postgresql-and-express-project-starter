import jwt, { Secret } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

import dotenv from "dotenv";

dotenv.config();
export const verifyAuthToken = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const authorizationHeader = req.headers.authorization;
    const token = authorizationHeader
      ? authorizationHeader.split(" ")[1]
      : undefined;
    const decoded = jwt.verify(token as string, process.env.TOKEN_SECRET ?? "");

    next();
  } catch (error) {
    res.status(401);
  }
};
