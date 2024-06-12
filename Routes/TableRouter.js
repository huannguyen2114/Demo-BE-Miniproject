import { Router } from 'express';
import { decodeJWT } from '../Middlewares/AuthMiddleware.js';
import { getStatus } from '../Controllers/TableController.js';

const router = Router();

// router.use(decodeJWT);
router.get('/:id',  getStatus);

export default router;