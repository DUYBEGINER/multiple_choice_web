import express from "express";
import cors from "cors";


const app = express()

/// Middleware ///
// Parse JSON bodies
app.use(express.json());

app.use(cors());

//import routes
import authRouter from './routes/authRoute.js';

// Use routes
app.use('/auth', authRouter);

export default app;