import { Router } from 'express';
import { decodeJWT } from '../Middlewares/AuthMiddleware.js';
import { updateOrder, createOrder, getOrder } from '../Controllers/OrderController.js';

const router = Router();

router.use(decodeJWT);
router.post('/',  createOrder);
router.put('/:id',  updateOrder);
router.get('/',  getOrder);

export default router;