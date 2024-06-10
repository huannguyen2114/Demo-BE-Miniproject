import { Router } from "express";
import {
    createFood,
    getFood,
    getFoodById,
    getAllFood
} from "../Controllers/FoodController.js";
const router = Router()


router.post("/", createFood);
// For Demo Only
router.get("/all", getAllFood);
router.get("/:id", getFoodById);
router.get("/", getFood);

export default router;