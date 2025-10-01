import { getAuth } from 'firebase-admin/auth';
import express from "express";
//import function
import {handleAuthWithSession, getCurrentUser, logOut} from '../controllers/authController.js'
import { authMiddleware, checkSession  } from "../middleware/verifyToken.js";
import { noCache } from '../middleware/noCache.js';

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

//Auth routes
router.get("/me",noCache, checkSession , getCurrentUser);
router.post('/login',noCache, authMiddleware, handleAuthWithSession);
router.post('/logout',noCache, authMiddleware, logOut);
// router.post('/signup', authMiddleware, signUp);

export default router;