import { getPool } from "../db/config.js";


const signUp = async (req, res) => {
  const { email, displayName } = req.body;
  console.log("Signing up user:", email, displayName);
  try{
    const pool = await getPool();
    await pool.request()
    .input('uid', 'adzxc12xx3')
      .input('email', email)
      .input('displayName', displayName)
      .query('INSERT INTO users (uid, email, displayName) VALUES (@uid, @email, @displayName);');
    res.status(201).json({ message: 'User signed up successfully' });
    } catch (error) {
    console.error('Error signing up user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export { signUp };