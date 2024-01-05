var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { bcryptHelper } from "../../utils/bcrypt.js";
import { jwtHelper } from "../../utils/jwt.js";
import { User } from "../models/user.model.js";
class UserController {
    signUp(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (req.user) {
                    const error = new Error();
                    error.message = "user already exists";
                    error.code = 400;
                    next(error);
                    return;
                }
                req.body.password = bcryptHelper.hashSync(req.body.password);
                const user = yield User.create({
                    fullname: req.body.fullname,
                    email: req.body.email,
                    password: req.body.password,
                    cauntry: req.body.cauntry,
                    education: req.body.education,
                    certificates: req.body.certificates
                });
                const TOKEN = jwtHelper.sign({ id: user.id });
                res.status(201).json({ data: TOKEN });
            }
            catch (error) {
                res.status(500).json({ error: error.message });
            }
        });
    }
    signIn(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield User.findOne({ where: { email: req.body.email } });
                if (!user) {
                    return res.status(404).json({ error: "user is not found" });
                }
                const comparedPassword = bcryptHelper.compareSync(req.body.password, user.password);
                if (!comparedPassword) {
                    return res.status(404).json({ error: "user is not found" });
                }
                const TOKEN = jwtHelper.sign({ id: user.id });
                res.status(200).json({ data: TOKEN });
            }
            catch (error) {
                res.status(500).json({ error: error.message });
            }
        });
    }
}
export { UserController };
