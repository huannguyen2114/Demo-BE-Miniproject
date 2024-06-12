import jwt from 'jsonwebtoken';
import { JWTconfig } from '../../config/JWTConfig.js';

export default async function refreshToken(req, res) {
    try {
        const cookies = req.cookies;
        if (!cookies.refreshToken) {
            return res.status(404).json({
                message: 'Not found refresh token in cookies !'
            });
        }
        const decodes = jwt.verify(cookies.refreshToken, JWTconfig.SECRET_REFRESH);
        const newToken = jwt.sign(
            {
                userName: decodes.userName
            },
            JWTconfig.SECRET,
            {
                algorithm: JWTconfig.algorithm,
                expiresIn: JWTconfig.tokenLife
            }
        );

        res.cookie('accessToken', newToken, { httpOnly: true, maxAge: JWTconfig.tokenLife });
        res.status(200).json({
            'accessToken': newToken
        });

    } catch (error) {
        console.error(req.method, req.url, error);
        res.status(401).json(error);
    }
}