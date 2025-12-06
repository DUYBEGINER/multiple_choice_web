import express from "express";
import {handleAuthWithSession, getCurrentUser, logOut} from '../controllers/authController.js'
import { authMiddleware, checkSession  } from "../middleware/verifyToken.js";
import { errorHandler } from "../middleware/errorHander.js";
import { noCache } from '../middleware/noCache.js';

const router = express.Router()

/**
 * Auth Routes
 * Base path: /api/auth
 */

// GET /api/auth/me
router.get("/me", noCache, checkSession , getCurrentUser);
// POST /api/auth/login
router.post('/login', noCache, authMiddleware, handleAuthWithSession);
// POST /api/auth/logout
router.post('/logout', noCache, authMiddleware, logOut);


export default router;