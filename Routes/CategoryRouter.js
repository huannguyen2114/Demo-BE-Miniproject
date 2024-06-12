import { Router } from 'express';
import {
    createCategory,
    getAllCategory
} from '../Controllers/FoodController.js';
import { decodeJWT } from '../Middlewares/AuthMiddleware.js';

const router = Router();


// For Demo Only
// router.use(decodeJWT);
router.post('/', createCategory);
router.get('/', getAllCategory);
export default router;
