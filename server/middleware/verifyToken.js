import app from "../firebase/firebase.js";
import { getAuth } from "firebase-admin/auth";



// const auth = getAuth(admin);
const authMiddleware = async (req, res, next) => {
  
  // đọc cookie "session" (nhờ cookie-parser đã parse)
  const sessionCookie = req.cookies?.session;

  if(sessionCookie){
    try{
      req.user = await getAuth().verifySessionCookie(sessionCookie, true);
      return next();
    }catch(error){
      res.clearCookie('session');
      return res.status(401).json({ message: 'Unauthorized: invalid session cookie' });
    }
  }

  // fallback: kiểm tra Bearer token
  const authHeader = req.headers.authorization || '';
  if (!authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized: missing or invalid token' });
  }
  
  const idToken = authHeader.slice(7).trim();
  let checkRevoked = true;
  try {
    const decodedToken = await getAuth().verifyIdToken(idToken, checkRevoked);
    req.user = decodedToken;
    req.idToken = idToken;
    return next();
  } catch (err) {
    if (err.code == 'auth/id-token-revoked') {
      console.error('Token revoked:', err);
      return res.status(401).json({ message: 'Token has been revoked' });
    }else{
      console.error('Error verifying token:', err);
      return res.status(401).json({ message: 'Unauthorized: invalid token' });
    }
  }
};

export {authMiddleware}