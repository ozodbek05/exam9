import { NextFunction, Request, Response } from "express"
import { userModel } from "../models/user.model.js"

export class UserMiddleware {


    async getUserByEmail(req: Request, res: Response, next: NextFunction) {
        try {
            const user = await userModel.findOne({ where: {email: req.body.email}})

            req.user = user
            next()
        } catch (error: any) {
            res.status(500).json({error: error.message})
        }
    }
}