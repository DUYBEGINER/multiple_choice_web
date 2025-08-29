import express from "express";
const router = express.Router()

//import function
import {signUp} from '../controllers/authController.js'


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


router.get('/user-info', (req, res) => {
    const userId = req.body.userId;
    console.log("Fetching info for user ID:", userId);
    // Fetch user information from the database or any other source
    const userInfo = {
        id: userId,
        name: "John Doe",
        email: "john.doe@example.com"
    };
    res.json(userInfo);
})

router.post('/signup', signUp)

export default router;