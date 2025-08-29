import { getPool } from "../db/config.js";


const signupUser = async (req, res) => {
  const { email, displayName } = req.body;

  try{
    const pool = await getPool();
    await pool.request()
    .input('uid', 'aasdasssdsda')
      .input('email', email)
      .input('displayName', displayName)
      .query('INSERT INTO users (uid, email, displayName) VALUES (@uid, @email, @displayName);');
    res.status(201).json({ message: 'User signed up successfully' });
    } catch (error) {
    console.error('Error signing up user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export { signupUser };