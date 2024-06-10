import { JWTconfig } from "../config/JWTConfig.js";
import jwt from "jsonwebtoken";

async function decodeJWT(req, res, next) {
    const cookies = req.cookies;
    try {
        if (!cookies.accessToken) {
            return next();
        }
        jwt.verify(
            cookies.accessToken,
            JWTconfig.SECRET,
            async (err, payload) => {
                if (err) console.log(err);
            }
        );
        res.locals.decodes = jwt.decode(cookies.accessToken);
        console.log(res.locals.decodes);
        next();
    } catch (error) {
        res.status(401).json(error);
    }
}

export { decodeJWT };

