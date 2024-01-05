import { model } from "mongoose";
import { workSchema } from "../schema/work.schema.js";
export const workModel = model("work", workSchema);
