import { getPool } from "../db/config.js";
import { createAndSetSessionCookie } from "../services/createSessionCookie.js";
import { getUserByUid, createUser } from "../repositories/userRepository.js";

// server/controllers/userController.js
const getCurrentUser = async (req, res) => {
  const user = req.user;
   if (!user) {
      return res.status(401).json({ message: "Not authenticated" });
    }
  try {
    const userRecord = await getUserByUid(user.uid);
    if (!userRecord) {
      return res.status(404).json({ message: "User not found" });
    }
    
    console.log("[auth controller] Current user auth:", userRecord);

    return res.status(200).json({
      message: 'Login successful',
      data: userRecord,
    });

  } catch (err) {
    console.error("Error in /me:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};


const handleAuthWithSession = async (req, res) => {
  const user = req.user;
  const idToken = req.idToken;
  console.log("Token in signIn:", idToken);
  console.log("Logging in user:", user);

  try {
    let userRecord = await getUserByUid(user.uid);

    if (!userRecord) {
      userRecord = await createUser(user.uid, user.email, user.displayName);
    }

    const {sessionCookie, expiresIn} = await createAndSetSessionCookie(idToken);

    res.cookie("session", sessionCookie, {
      maxAge: expiresIn,
      httpOnly: true,
      sameSite: "strict",
      path: "/",
    });
    
    return res.status(200).json({
      message: 'Login successful',
      data: userRecord,
    });
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}


const signUp = async (req, res) => {
  const { uid, email } = req.user;
  const idToken = req.idToken;
  const { displayName } = req.body;  // frontend gửi displayName lên
  console.log("Token in signUp:", idToken);
  console.log("user sign up:", req.user)
  try {
    const existingUser = await getUserByUid(uid);

    if (existingUser) {
      return res.status(409).json({ message: 'User already exists' });
    }

    const newUser = await createUser(uid, email, displayName);

    await createAndSetSessionCookie(res, idToken);

    return res.status(201).json({
      message: "User signed up successfully",
      user: newUser,
    });
  } catch (error) {
    console.error("Error signing up user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export { handleAuthWithSession, signUp, getCurrentUser };