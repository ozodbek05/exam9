import jwt from "jsonwebtoken";

class JsonWebToken {
    sign(payload: string | object): string {
        return jwt.sign(payload, process.env.JWT_KEY as string)
    }

    verify(token: string) {
        try {
        jwt.verify(token, process.env.JWT_KEY as string)
        } catch (error: any) {
            return null
        }        
    }
}

export const jwtHelper = new JsonWebToken()