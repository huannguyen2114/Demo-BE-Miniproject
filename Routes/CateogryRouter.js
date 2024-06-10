import { Router } from "express";
import { createCategory } from "../Controllers/FoodController.js";
const router = Router();


router.post("/", createCategory);


export default router;