import { Router } from "express";
import {
    createFood,
    getAllFood,
    getFood,
    getFoodById,
} from "../Controllers/FoodController.js";
import { decodeJWT } from "../Middlewares/AuthMiddleware.js";

const router = Router();

router.post("/", decodeJWT, createFood);
// For Demo Only
router.get("/all", decodeJWT, getAllFood);
router.get("/:id", decodeJWT, getFoodById);
router.get("/", decodeJWT, getFood);

export default router;
