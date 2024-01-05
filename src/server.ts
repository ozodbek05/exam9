import "dotenv/config"
import path from "path"
import express, { Application } from "express"
import { connect } from "mongoose";
import { userRouter } from "./user/auth/router/user.router.js"
import { WorkRouter } from "./user/work/router/work.router.js"


declare global {
    namespace Express {
      interface Request {
        user: Object;
      }
    }
  }

async function starter(): Promise<void> {
    try {
        const app: Application = express()
        app.use(express.json())

        await connect("mongodb://127.0.0.1:27017/imtixon");
        console.log("db is connected");

        app.use(express.static(path.join(path.resolve(), "uploads")));

        app.use(userRouter)
        app.use(WorkRouter)

        app.listen(process.env.APP_PORT, () => {console.log('server is running on port: ' + process.env.APP_PORT)})
    } catch (error: any) {
        console.error(error) 
        process.exit(-1)
    }
}

starter()