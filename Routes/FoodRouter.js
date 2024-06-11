import { Router } from "express";
import {
    createFood,
    getAllFood,
    getFood,
    getFoodById,
    deleteFood
} from "../Controllers/FoodController.js";
import { decodeJWT } from "../Middlewares/AuthMiddleware.js";

const router = Router();

router.use(decodeJWT);

router.post("/", createFood);
// For Demo Only
router.get("/all", getAllFood);
router.get("/:id", getFoodById);
router.get("/", getFood);
router.delete("/:id", deleteFood);

export default router;