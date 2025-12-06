import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
// import { errorHandler, notFoundHandler } from './src/middleware/errorHandler.js';
import { logger } from './utils/logger.js';

const app = express();

const corsOptions = { 
  origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173', 
  credentials: true 
};

/// Middleware ///
// Parse JSON bodies
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors(corsOptions));

// Request logging middleware
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.path}`);
  next();
});

// Import routes
import allRoutes from './routes/index.js';

// Mount routes
// app.use('/auth', authRouter);
app.use('/api', allRoutes);

// // 404 handler
// app.use(notFoundHandler);

// Global error handler (must be last)
// app.use(errorHandler);

export default app;