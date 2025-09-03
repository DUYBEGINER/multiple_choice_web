import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";


const app = express()

const corsOptions = { origin: process.env.CLIENT_ORIGIN || true, credentials: true };

/// Middleware ///
// Parse JSON bodies
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));
//import routes
import authRouter from './routes/authRoute.js';

// Use routes
app.use('/auth', authRouter);

export default app;