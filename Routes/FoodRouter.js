import { Router } from 'express';
import {
    createFood,
    getAllFood,
    getFood,
    getFoodById,
    deleteFood,
    getFoodImageById,
    createCategory,
    getAllCategory
} from '../Controllers/FoodController.js';
import { decodeJWT } from '../Middlewares/AuthMiddleware.js';
import fileUpload from 'express-fileupload';

const router = Router();

router.get('/img/:id', getFoodImageById);
// router.use(decodeJWT);

router.post('/', fileUpload({
    limits: {
        fileSize: 10000000,
    },
    abortOnLimit: true,
})
,createFood);

// For Demo Only
router.get('/all', getAllFood);
router.get('/:id', getFoodById);
router.get('/', getFood);
router.delete('/:id', deleteFood);
export default router;