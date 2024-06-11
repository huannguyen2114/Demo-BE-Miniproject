import { createFood } from "./FoodControler/createFoodAPI.js";
import { getAllFood } from "./FoodControler/getAllFoodAPI.js";
import { getFood } from "./FoodControler/getFoodAPI.js";
import { getFoodById } from "./FoodControler/getFoodByIdAPI.js";
import { createCategory } from "./FoodControler/createCategoryAPI.js";
import { deleteFood } from "./FoodControler/deleteFoodAPI.js";

export {
    createCategory,
    getAllFood,
    getFood,
    getFoodById,
    createFood,
    deleteFood
};