import app from "../firebase/firebase.js";
import { getAuth } from "firebase-admin/auth";


const checkSession = async (req, res, next) => {
  try {
    const sessionCookie = req.cookies.session;
    if (!sessionCookie) {
      return res.status(401).json({
        success: false,
        message: 'No sesstion cookie found'
      });
    }

    const decodedClaims = await getAuth().verifySessionCookie(sessionCookie, true);
    console.log("[auth middleware] USE SESSION COOKIE:", decodedClaims);

    if (!decodedClaims.email || !decodedClaims.uid) {
      throw new Error('Invalid session claims');
    }
    // Gắn user info vào req để dùng sau
    req.user = decodedClaims;
    next();
  } catch (error) {
    console.error("Session verification failed:", error);
    // Clear invalid cookie
    res.clearCookie('session', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
    });

    return res.status(401).json({
      success: false,
      message: 'Unauthorized: invalid session cookie'
    });
  }

}

// const auth = getAuth(admin);
const authMiddleware = async (req, res, next) => {
  try {
    // Kiểm tra Bearer token
    const authHeader = req.headers.authorization || '';
    if (!authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized: missing or invalid token'
      });
    }

    const idToken = authHeader.slice(7).trim();

    if (!idToken) {
      return res.status(401).json({ 
        success: false,
        message: 'Empty token provided' 
      });
    }

    const decodedToken = await getAuth().verifyIdToken(idToken);
    
    if (!decodedToken.email || !decodedToken.uid) {
      throw new Error('Invalid token claims');
    }

    
    console.log("[auth middleware] USE BEARER TOKEN:", req.user);

    req.user = decodedToken;
    req.idToken = idToken;
    next();
  } catch (error) {
    console.log("Error verifying ID token:", error);

    let errorMessage = 'Token verification failed';
    
    if (error.code === 'auth/id-token-expired') {
      errorMessage = 'Token has expired';
    } else if (error.code === 'auth/id-token-revoked') {
      errorMessage = 'Token has been revoked';
    }
   
    return res.status(401).json({ 
      success: false,
      message: errorMessage 
    });
  }
};

export { authMiddleware, checkSession }