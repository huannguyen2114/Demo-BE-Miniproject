import { Router } from 'express';
import {
    createCategory,
    getAllCategory
} from '../Controllers/FoodController.js';

const router = Router();


// For Demo Only
router.post('/', createCategory);
router.get('/', getAllCategory);
export default router;
