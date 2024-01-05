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
import { Work } from "../models/my-work.model.js";
import { User } from "../../auth/models/user.model.js";
export class WorkController {
    createWork(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const user = yield User.findOne({ id: id });
                if (!user) {
                    res.status(404).json({ msg: 'user is not found', data: null, error: true });
                    return;
                }
                const work = yield Work.create({
                    name: req.body.name,
                    price: req.body.price,
                    image: req.file.filename,
                    user: user.id
                });
                (_a = user.user) === null || _a === void 0 ? void 0 : _a.push(work);
                yield user.save();
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
                const query = req.query;
                if (!Object.keys(query).length) {
                    query.page = 1;
                    query.limit = 10;
                }
                ;
                const data = yield Work.findAndCountAll({
                    offset: (query.page - 1) * query.limit,
                    limit: query.limit
                });
                res.status(200).json({ data });
            }
            catch (error) {
                res.status(500).json({ error: error.message });
            }
        });
    }
    deleteWork(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    updateWork(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, price } = req.body;
                const work = req.work;
                if (req.file) {
                    fs.unlinkSync(path.join(path.resolve(), "uploads", work.image));
                }
                work.image = req.file.filename;
                work.name = name;
                work.price = price;
                yield work.save();
                res.status(200).json({ body: work, msg: "work updated" });
            }
            catch (error) {
                res.status(500).json({ error: error.message });
            }
        });
    }
}
