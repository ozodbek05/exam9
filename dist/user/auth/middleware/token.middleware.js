var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jwtHelper } from "../../../utils/jwt.js";
import jwt from "jsonwebtoken";
export class TokenChecker {
    checkToken(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.headers["authorization"];
                if (!token) {
                    res.status(401).json({ msg: "no token", data: null, error: true });
                    return;
                }
                const user = jwtHelper.verify(token);
                req.user = user;
                next();
            }
            catch (error) {
                if (error instanceof jwt.JsonWebTokenError) {
                    res.status(401).json({ error: 'invalid token' });
                    return;
                }
                res.status(500).json({ msg: error.message, data: null, error: true });
            }
        });
    }
}
