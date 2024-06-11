import { Router } from 'express';
import {
    createFood,
    getAllFood,
    getFood,
    getFoodById,
    deleteFood,
    getFoodImageById,
    createCategory
} from '../Controllers/FoodController.js';
import { decodeJWT } from '../Middlewares/AuthMiddleware.js';
import fileUpload from 'express-fileupload';

const router = Router();

router.use(decodeJWT);

router.post('/', fileUpload({
    limits: {
        fileSize: 10000000,
    },
    abortOnLimit: true,
})
,createFood);
router.get('/img/:id', getFoodImageById);

// For Demo Only
router.get('/all', getAllFood);
router.get('/:id', getFoodById);
router.get('/', getFood);
router.delete('/:id', deleteFood);
router.post('/category', createCategory);
export default router;