import { Router } from "express";
import {createFood } from "../Controllers/FoodControler/createFood.js";
import { getFood } from "../Controllers/FoodControler/getFood.js";
import { getFoodById } from "../Controllers/FoodControler/getFoodById.js";
import { getAllFood } from "../Controllers/FoodControler/getAllFood.js";
const router = Router()


router.post("/", createFood);
router.get("/all", getAllFood);
router.get("/:id", getFoodById);
router.get("/", getFood);

export default router;