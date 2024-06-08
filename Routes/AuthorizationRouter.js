import { Router } from "express";
import {
    addNewUser,
    login
} from "../Controllers/AuthorizationController.js";

const router = Router()

router.post("/login", login)
router.post("/register", addNewUser)

export default router