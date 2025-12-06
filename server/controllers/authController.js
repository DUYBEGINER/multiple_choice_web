import { getAuth } from 'firebase-admin/auth';
import { createAndSetSessionCookie } from "../services/createSessionCookie.js";
import { getUserByUid, createUser } from "../repositories/userRepository.js";



// server/controllers/userController.js
const getCurrentUser = async (req, res) => {
  console.log("Fetching current user...");
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Not authenticated"
      });
    }

    const userRecord = await getUserByUid(user.uid);
    if (!userRecord) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    console.log("[auth controller] Current user auth:", userRecord);
    return res.status(200).json({
      success: true,
      message: 'Login successful [getcurrentuser]',
      data: userRecord,
    });

  } catch (err) {
    console.error("Error in /me:", err);
    res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};


const handleAuthWithSession = async (req, res) => {
  try {
    const user = req.user;
    const idToken = req.idToken;

    console.log("Token in signIn:", idToken);
    console.log("Logging in user:", user);

    if (!user || !idToken) {
      return res.status(400).json({
        success: false,
        message: 'Invalid authentication data'
      });
    }

    let userRecord = await getUserByUid(user.uid);

    if (!userRecord) {
      // Create new user if doesn't exist
      userRecord = await createUser(user.uid, user.email, user.displayName);
    }

    const { sessionCookie, expiresIn } = await createAndSetSessionCookie(idToken);

    // Set secure cookie
    res.cookie("session", sessionCookie, {
      maxAge: expiresIn,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Chỉ gửi cookie qua HTTPS trong production
      sameSite: "strict",
      path: "/",
    });

    return res.status(200).json({
      success: true,
      message: 'Login or Sign up successful',
      data: userRecord,
    });
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({
      success: false,
      message: 'Authentication failed'
    });
  }
}


const logOut = async (req, res) => {
  try {
    const user = req.user;
    
    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'No user session found'
      });
    }

    console.log("Logging out user:", user);
    await getAuth().revokeRefreshTokens(user.uid);

    res.clearCookie('session', {
      httpOnly: true,
      sameSite: 'strict',
      path: '/',   
    });

    return res.status(200).json({ 
      success: true,
      message: 'Logout successful' 
    });
  } catch (err) {
    console.error("Error in /logout:", err);
    return res.status(500).json({ 
      success: false,
      message: "Internal server error" 
    });
  }
};

// const signUp = async (req, res) => {
//   try {
//     const { uid, email } = req.user;
//     const idToken = req.idToken;
//     const { displayName } = req.body;  // frontend gửi displayName lên

//     console.log("Token in signUp:", idToken);
//     console.log("user sign up:", req.user)

//      if (!uid || !email || !idToken) {
//       return res.status(400).json({
//         success: false,
//         message: 'Missing required authentication data'
//       });
//     }

//     const existingUser = await getUserByUid(uid);

//     if (existingUser) {
//       return res.status(409).json({ 
//         success: false,
//         message: 'User already exists'
//       });
//     }

//     const newUser = await createUser(uid, email, displayName);

//     const { sessionCookie, expiresIn } = await createAndSetSessionCookie(res, idToken);
    
//     // Set secure cookie
//     res.cookie("session", sessionCookie, {
//       maxAge: expiresIn,
//       httpOnly: true,
//       secure: process.env.NODE_ENV === 'production', // Chỉ gửi cookie qua HTTPS trong production
//       sameSite: "strict",
//     });

//     return res.status(201).json({
//       success: true,
//       message: "User created successfully",
//       user: newUser,
//     });
//   } catch (error) {
//     console.error("Error signing up user:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };


export { handleAuthWithSession, getCurrentUser, logOut };