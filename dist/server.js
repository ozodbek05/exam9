var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import "dotenv/config";
import path from "path";
import express from "express";
import { connect } from "mongoose";
import { userRouter } from "./user/auth/router/user.router.js";
import { WorkRouter } from "./user/work/router/work.router.js";
function starter() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const app = express();
            app.use(express.json());
            yield connect("mongodb://127.0.0.1:27017/imtixon");
            console.log("db is connected");
            app.use(express.static(path.join(path.resolve(), "uploads")));
            app.use(userRouter);
            app.use(WorkRouter);
            app.listen(process.env.APP_PORT, () => { console.log('server is running on port: ' + process.env.APP_PORT); });
        }
        catch (error) {
            console.error(error);
            process.exit(-1);
        }
    });
}
starter();
