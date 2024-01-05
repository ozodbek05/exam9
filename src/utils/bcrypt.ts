import bcrypt from "bcrypt"
import { SALT_ROUND } from "./constants.js"


class BcryptHelper {
    hashSync(password: string) {
        return bcrypt.hashSync(password, SALT_ROUND)
    }

    compareSync (originalPassword: string, hashedPassword: string) {
        return bcrypt.compareSync(originalPassword, hashedPassword)
    }
}

export const bcryptHelper = new BcryptHelper()