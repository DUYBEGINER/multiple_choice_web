import { getPool } from "../db/config.js";


const login = async (req, res) => {
   const uid = req.user.uid;
   try{
    const pool = await getPool();
    const result = await pool.request()
    .input('uid', uid)
    .query('SELECT * FROM users WHERE uid = @uid;');

    if (result.recordset.length > 0) {
      const userData = result.recordset[0];
      res.status(200).json({ message: 'User logged in successfully', user: userData });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
   }catch (error){
    console.error('Error logging in user:', error);
    res.status(500).json({ message: 'Internal server error' });

   }
}


const signUp = async (req, res) => {
  const { uid,  email, displayName } = req.body;
  // const user = req.user;
  console.log("Signing up user:", email, displayName);
  try{
    const pool = await getPool();
    await pool.request()
    .input('uid', uid)
      .input('email', email)
      .input('displayName', displayName)
      .query('INSERT INTO users (uid, email, displayName) VALUES (@uid, @email, @displayName);');
    res.status(201).json({ message: 'User signed up successfully' });
    } catch (error) {
    console.error('Error signing up user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export { login, signUp };