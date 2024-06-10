import jwt from "jsonwebtoken";
import { JWTconfig } from "../../config/JWTConfig.js";

export default async function refreshToken(req, res) {
    try {
        const cookies = req.cookies;
        if (!cookies.refreshToken) {
            return res.status(404).json({
                message: "Not found refresh token in cookies !",
            });
        }
        jwt.verify(cookies.refreshToken, JWTconfig.SECRET_REFRESH);
        const decodes = jwt.decode(cookies.refreshToken);
        const newToken = jwt.sign(
            {
                userName: decodes.userName,
            },
            JWTconfig.SECRET,
            {
                algorithm: JWTconfig.algorithm,
                expiresIn: JWTconfig.tokenLife,
            }
        );
        res.cookies("accessToken", newToken, {
            httpOnly: true,
            maxAge: JWTconfig.tokenLife,
        });
    } catch (error) {
        res.status(401).json(error);
    }
}

