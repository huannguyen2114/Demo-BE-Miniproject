import { Router } from 'express';
import { decodeJWT } from '../Middlewares/AuthMiddleware.js';
import { updateOrder, createOrder } from '../Controllers/OrderController.js';

const router = Router();

router.post('/', decodeJWT, createOrder);
router.put('/:id', decodeJWT, updateOrder);

export default router;