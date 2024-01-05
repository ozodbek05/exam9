import { NextFunction, Request, Response } from "express";
import { jwtHelper } from "../../../utils/jwt.js";
import jwt from "jsonwebtoken";

interface IUserToken {
  email: string;
}

export class TokenChecker {
  async checkToken(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const token = req.headers["authorization"];

      if (!token) {
        res.status(401).json({ msg: "no token", data: null, error: true });
        return;
      }

      const user = jwtHelper.verify(token) as IUserToken;
      req.user = user;

      next();
    } catch (error: any) {
        if(error instanceof jwt.JsonWebTokenError) {
            res.status(401).json({error: 'invalid token'})
            return
        }
      res.status(500).json({ msg: error.message, data: null, error: true });
    }
  }
}


