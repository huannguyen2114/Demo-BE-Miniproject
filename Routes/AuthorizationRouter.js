import { Router } from 'express';
import {
    addNewUser,
    login,
    logout,
    refreshToken
} from '../Controllers/AuthorizationController.js';
import { decodeJWT } from '../Middlewares/AuthMiddleware.js';

const router = Router();

router.post('/login', decodeJWT, login);
router.post('/register', addNewUser);
router.post('/logout', logout);
router.post('/access-token', refreshToken);

export default router;