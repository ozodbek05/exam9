var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import fs from "fs";
import path from "path";
import { workModel } from "../models/work.model.js";
export class WorkController {
    createWork(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const error = new Error();
                const { name, price } = req.body;
                if (!name || !price) {
                    error.message = "Invalid body";
                    error.code = 400;
                }
                const work = yield workModel.create({
                    name: req.body.name,
                    price: req.body.price,
                    image: req.file.filename,
                });
                res.status(201).json({ msg: 'Created', data: work, error: false });
            }
            catch (error) {
                res.status(500).json({ error: error.message });
            }
        });
    }
    getWork(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const works = yield workModel.find();
                res.status(200).json({ msg: "works", data: works, error: false, });
            }
            catch (error) {
                res.status(500).json({ error: error.message });
            }
        });
    }
    deleteWork(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { workId } = req.params;
                const theWork = yield workModel.findById(workId);
                if (!theWork) {
                    res.status(404).json({ msg: "Work not found", data: null, error: true });
                    return;
                }
                const theImage = theWork.image;
                if (theImage) {
                    const imagePath = path.join(path.resolve(), "uploads", theImage);
                    if (fs.existsSync(imagePath)) {
                        fs.unlinkSync(imagePath);
                    }
                }
                yield workModel.deleteOne({ _id: theWork._id });
                res.status(200).json({ msg: "deleted work", data: null, error: false });
            }
            catch (error) {
                res.status(500).json({ msg: error.message, data: null, error: true });
            }
        });
    }
    updateWork(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const error = new Error();
                const { workId } = req.params;
                const { name, price } = req.body;
                if (!name || !price) {
                    error.message = "Invalid body";
                    error.code = 400;
                }
                const theWork = yield workModel.findById(workId);
                if (!theWork) {
                    res.status(404).json({ msg: "work not found", data: null, error: true });
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
                const updatedWork = yield theWork.save();
                res.status(200).json({ msg: "updated work", data: updatedWork, error: false });
            }
            catch (error) {
                res.status(500).json({ error: error.message });
            }
        });
    }
}
