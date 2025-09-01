import { getPool } from "../db/config.js";
import { createAndSetSessionCookie } from "../services/createSessionCookie.js";

// server/controllers/userController.js
const getCurrentUser = async (req, res) => {
  try {
    // req.user đã có sẵn từ authMiddleware
    if (!req.user) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    return res.status(200).json({ user: req.user });
  } catch (err) {
    console.error("Error in /me:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};



const signIn = async (req, res) => {
  const uid = req.user.uid;
  const idToken = req.idToken;
  console.log("Logging in user with UID:", uid);
  try {
    const pool = await getPool();
    const result = await pool.request()
      .input('uid', uid)
      .query('SELECT * FROM users WHERE uid = @uid;');

    if (result.recordset.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    await createAndSetSessionCookie(res, idToken);


    return res.status(200).json({
      message: 'Login successful',
      user: result.recordset[0],
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
  try {
    const pool = await getPool();
    const existing = await pool.request()
      .input('uid', uid)
      .query('SELECT * FROM users WHERE uid = @uid;');

    if (existing.recordset.length > 0) {
      return res.status(409).json({ message: 'User already exists' });
    }

    await pool.request()
      .input('uid', uid)
      .input('email', email)
      .input('displayName', displayName)
      .query('INSERT INTO users (uid, email, displayName) VALUES (@uid, @email, @displayName);');

    await createAndSetSessionCookie(res, idToken);

    return res.status(201).json({
      message: 'User signed up successfully',
      user: { uid, email, displayName }
    });
  } catch (error) {
    console.error('Error signing up user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export { signIn, signUp, getCurrentUser };