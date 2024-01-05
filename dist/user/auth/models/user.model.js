import { model } from "mongoose";
import { userSchema } from "../schema/user.schema.js";
export const userModel = model("user", userSchema);
