import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

type JWTPayLoad = {
  data: {
    userId: number;
    email: string;
    role: "user" | "admin";
  };
};

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authorization = req.headers.authorization;
  // console.log("----------------------------------", authorization);
  if (!authorization) {
    res.send("no token");
    return;
  }
  const accessToken = authorization.split(" ")[1];

  try {
    const decoded = jwt.verify(accessToken, "secret") as JWTPayLoad;

    req.user = decoded.data;
    next();
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "invalid credentials" });
  }
};
