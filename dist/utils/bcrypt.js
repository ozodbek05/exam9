import bcrypt from "bcrypt";
import { SALT_ROUND } from "./constants.js";
class BcryptHelper {
    hashSync(password) {
        return bcrypt.hashSync(password, SALT_ROUND);
    }
    compareSync(originalPassword, hashedPassword) {
        return bcrypt.compareSync(originalPassword, hashedPassword);
    }
}
export const bcryptHelper = new BcryptHelper();
