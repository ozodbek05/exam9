import { Request, Response } from "express";
import fs from "fs"
import path from "path"
import { workModel } from "../models/work.model.js";

export class WorkController {
    async createWork(req: Request, res: Response): Promise<void>  {
        try {
            const error: any = new Error()
            const { name, price } = req.body;

            if(!name || !price) {
                error.message = "Invalid body"
                error.code = 400
            }

            const work = await workModel.create({
                name: req.body.name,
                price: req.body.price,
                image: req.file.filename,
            })

            res.status(201).json({msg: 'Created', data: work, error: false})
        } catch (error: any) {
            res.status(500).json({error: error.message})
        }
    }

    async getWork(req: Request, res: Response): Promise<void>  {
        try {
            const works = await workModel.find();

            res.status(200).json({msg: "works", data: works, error: false,});
    
        } catch (error: any) {
            res.status(500).json({error: error.message});
        }
    }

    async deleteWork(req: Request, res: Response): Promise<void>  {
        try {
            const { workId } = req.params;
      
            const theWork = await workModel.findById(workId);
      
            if (!theWork) {
              res.status(404).json({msg: "Work not found", data: null, error: true});
              return;
            }
      
            const theImage = theWork.image;
      
            if (theImage) {
              const imagePath = path.join(path.resolve(), "uploads", theImage);
              if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
              }
            }
      
            await workModel.deleteOne({ _id: theWork._id });
      
            res.status(200).json({msg: "deleted work", data: null, error: false});
          } catch (error: any) {
            res.status(500).json({ msg: error.message, data: null, error: true });
          }
    }
        

    async updateWork(req: Request, res: Response): Promise<void> {
        try {
            const error: any = new Error()
            const { workId } = req.params;
            const { name, price } = req.body;

            if (!name || !price) {
                error.message = "Invalid body"
                error.code = 400
            }



        const theWork = await workModel.findById(workId);

        if (!theWork) {
            res.status(404).json({msg: "work not found", data: null, error: true });
            return;
        }

        const theImage = theWork.image;

        theWork.name = name;
        theWork.price = price;

        if (req.file) {
            if (theImage) {
                const imagePath = path.join(path.resolve(), "uploads", theImage);
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }
        }
        theWork.image = req.file.filename;
      }

      const updatedWork = await theWork.save();

      res.status(200).json({ msg: "updated work", data: updatedWork, error: false });
        } catch (error: any) {
            res.status(500).json({ error: error.message });
            }
    }
}