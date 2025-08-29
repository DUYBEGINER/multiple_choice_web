import express from "express";
const app = express()

/// Middleware ///
// Parse JSON bodies
app.use(express.json());

//import routes
import authRouter from './routes/authRoute.js';

// Use routes
app.use('/auth', authRouter);

export default app;