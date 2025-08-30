import app from "../firebase/firebase.js";
import { getAuth } from "firebase-admin/auth";

// const auth = getAuth(admin);
const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization || '';
  if (!authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized: missing or invalid token' });
  }
  const idToken = authHeader.slice(7).trim();
  try {
    const decodedToken = await getAuth().verifyIdToken(idToken);
    req.user = decodedToken;
    return next();
  } catch (err) {
    console.error('Error verifying token:', err);
    return res.status(401).json({ message: 'Unauthorized: invalid token' });
  }
};



export {authMiddleware}