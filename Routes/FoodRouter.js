import { Router } from "express";
// import {createFood } from "../Controllers/FoodControler/createFoodAPI.js";
// import { getFood } from "../Controllers/FoodControler/getFoodAPI.js";
// import { getFoodById } from "../Controllers/FoodControler/getFoodByIdAPI.js";
// import { getAllFood } from "../Controllers/FoodControler/getAllFoodAPI.js";
import {
    createFood,
    getFood,
    getFoodById,
    getAllFood
} from "../Controllers/FoodControler.js";
const router = Router()


router.post("/", createFood);
// For Demo Only
router.get("/all", getAllFood);
router.get("/:id", getFoodById);
router.get("/", getFood);

export default router;