import { Router } from "express";
import {createCategory } from "../Controllers/FoodControler/category.controller.js";
const router = Router();


router.post("/", createCategory);


export default router;