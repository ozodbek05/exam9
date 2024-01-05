import { Router } from "express";
import {upload} from "../../../utils/multer.conf.js"
import { WorkController } from "../controller/work.controller.js";
import { TokenChecker } from "../../auth/middleware/token.middleware.js";

export const WorkRouter = Router()

const workController = new WorkController()
const tokenChecker = new TokenChecker()

WorkRouter.post('/work', tokenChecker.checkToken,upload.single("file"),workController.createWork)
WorkRouter.get('/work', workController.getWork)
WorkRouter.delete('/work/:workId',tokenChecker.checkToken, workController.deleteWork)
WorkRouter.put('/work/:workId',tokenChecker.checkToken, upload.single("file"),workController.updateWork)