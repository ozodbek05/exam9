import { Router } from "express";
import { upload } from "../../../utils/multer.conf.js";
import { WorkController } from "../controller/work.controller.js";
export const myWorkRouter = Router();
const workController = new WorkController();
myWorkRouter.post('/my-work/:id', upload.single("file"), workController.createWork);
myWorkRouter.get('/my-work', workController.getWork);
myWorkRouter.delete('/my-work/:id');
myWorkRouter.put('/my-work/:id', workController.updateWork);
