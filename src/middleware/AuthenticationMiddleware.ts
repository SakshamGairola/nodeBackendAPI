import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const authMiddleware = (req: Request, res: Response, next: NextFunction): any => {
  
  if (!req.headers.authorization) {
    return res.status(401).send({
      status: 401,
      message: "Login to access"
    });
  }

  let secretKey = process.env.JWT_SECRET_KEY || "MY-SECRET-KEY";
  const token: string = req.headers.authorization.split(" ")[1];

  try {
    const credential: string | object = jwt.verify(token, secretKey);
    if (credential) {
      req.app.locals.credential = credential;
      return next();
    }
    return res.send("token invalid");
  } catch (error) {
    return res.send(error);
  }

}