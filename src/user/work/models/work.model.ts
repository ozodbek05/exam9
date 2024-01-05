import { model } from "mongoose";
import { IWork, workSchema } from "../schema/work.schema.js";

export const workModel = model<IWork>("work", workSchema);
