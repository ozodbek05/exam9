import { model } from "mongoose";
import { IUser, userSchema } from "../schema/user.schema.js";

export const userModel = model<IUser>("user", userSchema);