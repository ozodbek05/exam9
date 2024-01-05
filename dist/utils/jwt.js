import jwt from "jsonwebtoken";
class JsonWebToken {
    sign(payload) {
        return jwt.sign(payload, process.env.JWT_KEY);
    }
    verify(token) {
        try {
            jwt.verify(token, process.env.JWT_KEY);
        }
        catch (error) {
            return null;
        }
    }
}
export const jwtHelper = new JsonWebToken();
