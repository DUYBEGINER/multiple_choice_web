import express from "express";
//import function
import {login, signUp} from '../controllers/authController.js'
import { authMiddleware } from "../middleware/verifyToken.js";

const router = express.Router()

// middleware that is specific to this router
const timeLog = (req, res, next) => {
    const now = new Date();
    const hh = now.getHours().toString().padStart(2, "0");
    const mm = now.getMinutes().toString().padStart(2, "0");
    const ss = now.getSeconds().toString().padStart(2, "0");

    console.log(`[${hh}:${mm}:${ss}]`);
    next();
}


router.use(timeLog)

router.post('/login', authMiddleware, login);
router.post('/signup', authMiddleware, signUp);

export default router;