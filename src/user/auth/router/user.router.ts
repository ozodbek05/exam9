import { Router } from "express";
import { AuthMiddleware } from "../middleware/auth.middleware.js";
import { UserController } from "../controller/auth.controller.js";
import { UserMiddleware } from "../middleware/user.meddleware.js";
import { upload } from "../../../utils/multer.conf.js";

export const userRouter = Router()

const authMiddleware = new AuthMiddleware()
const userMiddleware = new UserMiddleware()
const userController = new UserController()

userRouter.post('/signup', upload.single("file"), authMiddleware.signUp, userController.signUp)
userRouter.post('/signin', userController.signIn)