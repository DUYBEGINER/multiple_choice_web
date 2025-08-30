import app from "../firebase/firebase.js";
import { getAuth } from "firebase-admin/auth";

// const auth = getAuth(admin);

const authMiddleware = async (req, res, next) =>{
    const authHeader = req.headers.authorization;
    const token = authHeader.split(' ')[1];
    console.log("Authorization header:", authHeader);
    console.log("authHeader:", authHeader.startsWith('Bearer '));
    if( !token || !authHeader.startsWith('Bearer ')){
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    const idToken = token;
    console.log("id token:", idToken);
    try{
        const decodedToken = await getAuth().verifyIdToken(idToken);
        console.log("Decoded token:", decodedToken);
        req.user = decodedToken;
        next();
    }catch(error){
        console.log("Error verifying token:", error);
        res.status(401).json({ message: 'Unauthorized: invalid token!' });
    }
    
}


export {authMiddleware}