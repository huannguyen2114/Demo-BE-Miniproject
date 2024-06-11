import { Router } from "express";
import { decodeJWT } from "../Middlewares/AuthMiddleware.js";
import { getStatus } from "../Controllers/TableController.js";

const router = Router();

router.get('/:id', decodeJWT, getStatus);

export default router;