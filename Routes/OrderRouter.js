import { Router } from "express";
import { decodeJWT } from "../Middlewares/AuthMiddleware.js";
import { updateOrder } from "../Controllers/OrderController.js";

const router = Router();

router.put('/orders/:id', decodeJWT, updateOrder);

export default router;