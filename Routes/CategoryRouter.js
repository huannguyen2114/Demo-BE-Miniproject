import { Router } from 'express';
import { createCategory, getAllCategory } from '../Controllers/CategoryController.js';
import { decodeJWT } from '../Middlewares/AuthMiddleware.js';


const router = Router();

router.use(decodeJWT);

router.get('/', getAllCategory);
router.post('/', createCategory);


export default router;