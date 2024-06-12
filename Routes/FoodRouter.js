import { Router } from 'express';
import {
    createFood,
    getAllFood,
    getFood,
    getFoodById,
    deleteFood,
    getFoodImageById,
    updateFood
} from '../Controllers/FoodController.js';
import { decodeJWT } from '../Middlewares/AuthMiddleware.js';
import fileUpload from 'express-fileupload';

const router = Router();

router.get('/img/:id', getFoodImageById);

// router.use(decodeJWT);

// TODO: POST REQUEST
router.post('/', fileUpload({ limits: { fileSize: 10000000, }, abortOnLimit: true, }), createFood);

// TODO: GET REQUEST


// For Demo Only
router.get('/all', getAllFood);

// Main route

// Get only one food
router.get('/:id', getFoodById);


// Filtering food and do pagination
router.get('/', getFood);

// TODO: DELETE REQUEST
router.delete('/:id', deleteFood);

// TODO: PUT REQUEST
router.put('/:id', fileUpload({ limits: { fileSize: 10000000, }, abortOnLimit: true, }), updateFood);
export default router;