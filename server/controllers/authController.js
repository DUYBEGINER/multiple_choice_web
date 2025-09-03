import { getPool } from "../db/config.js";
import { createAndSetSessionCookie } from "../services/createSessionCookie.js";

// server/controllers/userController.js
const getCurrentUser = async (req, res) => {
  const user = req.user;
   if (!user) {
      return res.status(401).json({ message: "Not authenticated" });
    }
  try {
    const pool = await getPool();
    const result = await pool.request()
      .input('uid', user.uid)
      .query('SELECT * FROM users WHERE uid = @uid;');


    console.log("[auth controller] Current user auth:", result.recordset[0]);

    return res.status(200).json({
      message: 'Login successful',
      data: result.recordset[0],
    });

  } catch (err) {
    console.error("Error in /me:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};



const signIn = async (req, res) => {
  const user = req.user;
  const idToken = req.idToken;
  console.log("Token in signIn:", idToken);
  console.log("Logging in user:", user);

  try {
    const pool = await getPool();
    const result = await pool.request()
      .input('uid', user.uid)
      .query('SELECT * FROM users WHERE uid = @uid;');
    var userRecord;

    if (result.recordset.length === 0) {
      await pool.request()
        .input('uid', user.uid)
        .input('email', user.email)
        .input('displayName', user.displayName)
        .query('INSERT INTO users (uid, email, displayName) VALUES (@uid, @email, @displayName);');

      const newUser = await pool.request()
          .input('uid', user.uid)
          .query('SELECT * FROM users WHERE uid = @uid;');
        userRecord = newUser.recordset[0];
    }else{
        userRecord = result.recordset[0];
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