import { JWTconfig } from '../config/JWTConfig.js';
import jwt from 'jsonwebtoken';

async function decodeJWT(req, res, next) {
    try {
        const cookies = req.cookies;
        if (!cookies.accessToken) {
            if (req.body.pwd) {
                return next();
            }
            return res.status(401).json({ 'message': 'Unauthorized access' });
        }
        jwt.verify(cookies.accessToken, JWTconfig.SECRET);
        res.locals.decodes = jwt.decode(cookies.accessToken);
        next();
    } catch (error) {
        console.error(req.method, req.url, error);
        return res.status(401).json(error);
    }
}

export {
    decodeJWT
};