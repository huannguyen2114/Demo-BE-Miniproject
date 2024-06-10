import { Router } from "express";
import {
    addNewUser,
    login,
    logout,
} from "../Controllers/AuthorizationController.js";

const router = Router();

router.post("/login", login);
router.post("/register", addNewUser);
router.post("/logout", logout);

export default router;
