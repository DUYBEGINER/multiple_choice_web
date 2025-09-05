import app from "../firebase/firebase.js";
import { getAuth } from "firebase-admin/auth";


const checkSession = async (req, res, next) => {

  const sessionCookie = req.cookies.session;
  if(!sessionCookie) return res.status(401).json({ message: 'Unauthorized: invalid session cookie' });
  try {
    const decodedClaims = await getAuth().verifySessionCookie(sessionCookie, true);
    console.log("[auth middleware] USE SESSION COOKIE:", decodedClaims);

    if(!decodedClaims.email) return res.status(401).json({ message: "Unauthorized: Invalid session" });

     // Gắn user info vào req để dùng sau
    req.user = decodedClaims;

    next();
  } catch (error) {
    res.clearCookie('session');
    return res.status(401).json({ message: 'Unauthorized: invalid session cookie' });
  }
 
}

// const auth = getAuth(admin);
const authMiddleware = async (req, res, next) => {
  
  // đọc cookie "session" (nhờ cookie-parser đã parse)
  // const sessionCookie = req.cookies?.session;

  // if(sessionCookie){
  //   try{
  //     req.user = await getAuth().verifySessionCookie(sessionCookie, true);
  //     console.log("[auth middleware] USE SESSION COOKIE:", req.user);
  //     return next();
  //   }catch(error){
  //     res.clearCookie('session');
  //     return res.status(401).json({ message: 'Unauthorized: invalid session cookie' });
  //   }
  // }

  // Kiểm tra Bearer token
  const authHeader = req.headers.authorization || '';
  if (!authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized: missing or invalid token' });
  }
  const idToken = authHeader.slice(7).trim();
  try {
    const decodedToken = await getAuth().verifyIdToken(idToken);
    req.user = decodedToken;
    console.log("[auth middleware] USE BEARER TOKEN:", req.user);
    req.idToken = idToken;
    return next();
  } catch (err) {
    console.log("Error verifying ID token:", err);
    return res.status(401).json({ message: 'You are not authorized to access this resource' });
  }
};

export {authMiddleware, checkSession }