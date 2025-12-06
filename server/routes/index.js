import express from 'express';
import authRoutes from './authRoute.js';

const router = express.Router();

/**
 * API Routes
 * Base path: /api
 */

// Health check endpoint
router.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'API is healthy',
    timestamp: new Date().toISOString(),
  });
});

// Mount routes
router.use('/auth', authRoutes);

export default router;