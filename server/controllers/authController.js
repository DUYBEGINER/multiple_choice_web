import { getAuth } from 'firebase-admin/auth';
import { createAndSetSessionCookie } from "../utils/session.js";
import { getUserById, createUser } from "../services/user.service.js";
import { ApiResponse } from '../utils/response.js';


// Get current authenticated user
const getCurrentUser = async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      return ApiResponse.error(res, 'No user session found', 400);
    }

    // Fetch user information from database
    const userRecord = await getUserById(user.uid);
    if (!userRecord) {
      return ApiResponse.error(res, 'User not found', 404);
    }

    return ApiResponse.success(res, userRecord);

  } catch (err) {
    return ApiResponse.error(res, "Internal server error", 500);
  }
};


// Handle authentication with session cookie
const handleAuthWithSession = async (req, res) => {
  try {
    const user = req.user;
    const idToken = req.idToken;

    console.log("Token in signIn:", idToken);
    console.log("Logging in user:", user);

    if (!user || !idToken) {
      return ApiResponse.error(res, 'Invalid authentication data', 400);
    }

    // Check if user exists in the database
    let userRecord = await getUserById(user.uid);

    if (!userRecord) {
      // Create new user if doesn't exist (sign-up flow)
      userRecord = await createUser(user.uid, user.email, user.displayName);
    }

    // Create session cookie
    const { sessionCookie, expiresIn } = await createAndSetSessionCookie(idToken);

    // Set secure cookie
    res.cookie("session", sessionCookie, {
      maxAge: expiresIn,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Chỉ gửi cookie qua HTTPS trong production
      sameSite: "strict",
      path: "/",
    });

    return ApiResponse.success(res, userRecord, 'Authentication successful');
  } catch (error) {
    return ApiResponse.error(res, "Authentication failed", 500);
  }
}


// Log out user
const logOut = async (req, res) => {
  try {
    const user = req.user;

    // Ensure user is authenticated
    if (!user) {
      return ApiResponse.error(res, 'No user session found', 400);
    }

    // Revoke refresh tokens to log out user from all devices
    await getAuth().revokeRefreshTokens(user.uid);
    
    // Clear session cookie
    res.clearCookie('session', {
      httpOnly: true,
      sameSite: 'strict',
      path: '/',
    });

    return ApiResponse.success(res, null, 'Logout successful');
  } catch (err) {
    console.error("Error in /logout:", err);
    return ApiResponse.error(res, "Internal server error", 500);
  }
};

export { handleAuthWithSession, getCurrentUser, logOut };