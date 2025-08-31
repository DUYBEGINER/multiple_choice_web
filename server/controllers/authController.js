import { getPool } from "../db/config.js";


const signIn = async (req, res) => {
   const uid = req.user.uid;
   console.log("Logging in user with UID:", uid);
   try{
    const pool = await getPool();
    const result = await pool.request()
      .input('uid', uid)
      .query('SELECT * FROM users WHERE uid = @uid;');
      
    if(result.recordset.length === 0){
      return res.status(404).json({ message: 'User not found' });
    }
   return res.status(200).json({ message: 'Login successful', user: result.recordset[0] });
   }catch (error){
      console.error('Error logging in user:', error);
      res.status(500).json({ message: 'Internal server error' });
   }
}


const signUp = async (req, res) => {
  const { uid, email } = req.user;
  const { displayName } = req.body;  // frontend gửi displayName lên
  try{
    const pool = await getPool();
    const existing = await pool.request()
    .input('uid', uid)
    .query('SELECT * FROM users WHERE uid = @uid;');

    if(existing.recordset.length > 0){
      return res.status(409).json({ message: 'User already exists' });
    }

    await pool.request()
      .input('uid', uid)
      .input('email', email)
      .input('displayName', displayName)
      .query('INSERT INTO users (uid, email, displayName) VALUES (@uid, @email, @displayName);');

      return res.status(201).json({ message: 'User signed up successfully' });
    } catch (error) {
      console.error('Error signing up user:', error);
      res.status(500).json({ message: 'Internal server error' });
  }
};

export { signIn, signUp };