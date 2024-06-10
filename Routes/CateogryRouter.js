import { Router } from "express";
import { createCategory } from "../Controllers/FoodController";
const router = Router();


router.post("/", createCategory);


export default router;