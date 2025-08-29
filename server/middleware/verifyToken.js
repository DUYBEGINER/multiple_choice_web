import admin from "../firebase/firebase.js";
import { getAuth } from "firebase/auth";

// const auth = getAuth(admin);

const authMiddleware = async (req, res, next) =>{
    const authHeader = req.headers.authorization;
    if( !authHeader || !authHeader.startsWith('Bearer ')){
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    const idToken = authHeader.split(' ')[1];
    try{
        const decodedToken = await getAuth().verifyIdToken(idToken)
        req.user = decodedToken;
        next();
    }catch{
        res.status(401).json({ message: 'Unauthorized: invalid token!' });
    }
    
}


export {authMiddleware}