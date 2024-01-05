var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { userModel } from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { jwtHelper } from "../../../utils/jwt.js";
export class AuthMiddleware {
    signUp(req, res, next) {
        try {
            const { fullname, email, password, cauntry, education, certificates } = req.body;
            const pattern = /^([A-Za-z]+)$/;
            const emailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
            const error = new Error();
            if (!fullname || !email || !password || !pattern.test(fullname) || !emailPattern.test(email) || !cauntry || !education || !certificates) {
                error.message = "Invalid body";
                error.code = 400;
                next(error);
            }
            next();
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    checkToken(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.headers['authorization'];
                if (!token) {
                    const error = new Error();
                    error.message = 'unauthorized';
                    return res.status(401).json({ error: error.message });
                }
                const extractedToken = jwtHelper.verify(token);
                const user = yield userModel.findOne({ where: { id: extractedToken.id } });
                req.user = user;
                next();
            }
            catch (error) {
                if (error instanceof jwt.JsonWebTokenError) {
                    return res.status(401).json({ error: 'invalid token' });
                }
                res.status(500).json({ error: error.message });
            }
        });
    }
}
