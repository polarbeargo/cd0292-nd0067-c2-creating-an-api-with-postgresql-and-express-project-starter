import jwt, { Secret } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

import dotenv from "dotenv";

dotenv.config();

export const verifyAuthToken = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (process.env.ENV !== "test") {
    try {
      const authorizationHeader = req.headers.authorization;
      if (!authorizationHeader) {
        return res
          .status(401)
          .json({ message: "Authorization header missing" });
      }
      const token = authorizationHeader.split(" ")[1];
      const tokenSecret = process.env.TOKEN_SECRET as Secret;
      if (!tokenSecret) {
        return res.status(401).json({ message: "Token secret missing" });
      }
      const decoded = jwt.verify(token, tokenSecret);

      next();
    } catch (error) {
      res.status(401).json({ message: "Invalid token" });
    }
  } else {
    next();
  }
};

// Error handling middleware
export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.error(err); // Log the error for debugging
  res.status(500).json({ message: "Internal Server Error" });
};
