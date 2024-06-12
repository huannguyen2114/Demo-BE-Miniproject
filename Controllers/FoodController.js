import { createFood } from './FoodControler/createFoodAPI.js';
import { getAllFood } from './FoodControler/getAllFoodAPI.js';
import { getFood } from './FoodControler/getFoodAPI.js';
import { getFoodById } from './FoodControler/getFoodByIdAPI.js';
import { deleteFood } from './FoodControler/deleteFoodAPI.js';
import { getFoodImageById } from './FoodControler/getFoodImageById.js';
import { updateFood } from './FoodControler/updateFoodAPI.js';

export {
    getAllFood,
    getFood,
    getFoodById,
    createFood,
    deleteFood,
    getFoodImageById,
    updateFood,
};