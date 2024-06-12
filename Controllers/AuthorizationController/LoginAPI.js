import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { models } from '../../Models/index.js';
import 'dotenv/config';
import { mapUser } from '../../DTO/UserDTO.js';
import { JWTconfig } from '../../config/JWTConfig.js';

function generateAccessToken(payload) {
    return jwt.sign(payload, JWTconfig.SECRET, { algorithm: JWTconfig.algorithm, expiresIn: JWTconfig.tokenLife });
}

function generateRefreshToken(payload) {
    return jwt.sign(payload, JWTconfig.SECRET_REFRESH, { algorithm: JWTconfig.algorithm, expiresIn: JWTconfig.refreshTokenLife });
}

export default async function login(req, res) {
    try {
        let extractedUser = res.locals.decodes;
        // If not provided with access token, check username and password
        if (!extractedUser) {
            const { userName, pwd } = req.body;
            if (!userName || !pwd) {
                return res.status(400).json({ 'message': 'No username and/or password' });
            }
            extractedUser = await models.User.findOne({ where: { userName: userName } });
            if (!extractedUser) {
                return res.status(404).json({ 'message': 'Incorrect username or password' });
            }
            const result = await bcrypt.compare(pwd, extractedUser.pwd);
            if (!result) {
                return res.status(404).json({ 'message': 'Incorrect username or password' });
            }
        }
        else extractedUser = await models.User.findOne({ where: { userName: extractedUser.userName } });

        const accessToken = generateAccessToken({ userName: extractedUser.userName });
        const refreshToken = generateRefreshToken({ userName: extractedUser.userName });
        res.cookie('accessToken', accessToken, { httpOnly: false, maxAge: JWTconfig.tokenLife });
        res.cookie('refreshToken', refreshToken, { httpOnly: false, maxAge: JWTconfig.refreshTokenLife });

        return res.status(200).json(mapUser(extractedUser));
    } catch (error) {
        console.error(req.method, req.url, error);
        res.status(500).json({ 'message': 'Server cannot login' });
    }
}