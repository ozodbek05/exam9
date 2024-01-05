import { userModel } from "../models/user.model.js";
import jwt from "jsonwebtoken";
import {jwtHelper} from "../../../utils/jwt.js"
import { NextFunction, Request, Response } from "express";

export class AuthMiddleware {
    signUp(req: Request, res: Response, next: NextFunction) {
        try {
            const {fullname, email, password, cauntry,education, certificates} = req.body
            const pattern = /^([A-Za-z]+)$/;
            const emailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
            const error: any = new Error()

            if(!fullname|| !email || !password || !pattern.test(fullname) || !emailPattern.test(email) || !cauntry || !education || !certificates) {
                error.message = "Invalid body"
                error.code = 400
                next(error)  
            }

            next()
        } catch (error: any) {
            res.status(500).json({error: error.message})
        }
    }

    async checkToken(req: Request, res: Response, next: NextFunction) {
        try {
            const token = req.headers['authorization']
            if(!token) {
                const error = new Error()
                error.message = 'unauthorized'
                return res.status(401).json({error: error.message})
            }

            const extractedToken: any = jwtHelper.verify(token)
            const user = await userModel.findOne({where: {id: extractedToken.id}})

            req.user = user
            next()
        } catch (error: any) {
            if(error instanceof jwt.JsonWebTokenError) {
                return res.status(401).json({error: 'invalid token'})
            }
            res.status(500).json({error: error.message})
        }
    }
}