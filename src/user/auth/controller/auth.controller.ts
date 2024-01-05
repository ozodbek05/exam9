import { NextFunction, Request, Response } from "express"
import { bcryptHelper } from "../../../utils/bcrypt.js"
import { jwtHelper } from "../../../utils/jwt.js"
import { userModel } from "../models/user.model.js"

class UserController {
    

    async signUp(req: Request, res: Response, next: NextFunction) {
        try {
            if(req.user) {
                const error: any = new Error()
                error.message = "user already exists"
                error.code = 400
                next(error)
                return
            }

            req.body.password = bcryptHelper.hashSync(req.body.password)

            const user = await userModel.create({
                image: req.file.filename,
                fullname: req.body.fullname,
                email: req.body.email,
                password: req.body.password,
                cauntry: req.body.cauntry,
                education: req.body.education,
                certificates: req.body.certificates
            })

            const TOKEN = jwtHelper.sign({ id: user.id })

            res.status(201).json({data: TOKEN })
        } catch (error: any) {
            res.status(500).json({ error: error.message})
        }
    }

    async signIn(req: Request, res: Response, next: NextFunction) {
        try {
            const user: any = await userModel.findOne({where: {email: req.body.email}})
            if(!user) {
                return res.status(404).json({error: "user is not found"})
            }

            const comparedPassword = bcryptHelper.compareSync(req.body.password, user.password) 
            if(!comparedPassword) {
                return res.status(404).json({error: "user is not found"})
            }

            const TOKEN = jwtHelper.sign({ id: user.id})

            res.status(200).json({data: TOKEN })
        } catch (error: any) {
            res.status(500).json({ error: error.message })
        }
    }
}

export {
    UserController
}