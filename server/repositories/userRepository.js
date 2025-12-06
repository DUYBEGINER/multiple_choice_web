import { getPool } from "../db/config.js";
import { prisma } from '../lib/prisma.js';
import {BaseRepository} from './base.repository.js';


class UserRepository extends BaseRepository {
  constructor() {
    super(prisma.users);
  }
}

export const userRepository = new UserRepository();
export default userRepository;

// export const getUserByUid = async (uid) => {
//   try{
//     return await prisma.users.findUnique({
//       where: { uid },
//     });
//   }catch(error){
//     console.error("Error fetching user by UID:", error);
//     throw error;
//   }
// }
// const getUserByUid = async (uid) => {
//   const pool = await getPool();
//   const result = await pool
//     .request()
//     .input("uid", uid)
//     .query("SELECT * FROM users WHERE uid = @uid;");
//   return result.recordset[0] || null;
// };

// const createUser = async (uid, email, displayName) => {
//   const pool = await getPool();
//   await pool
//     .request()
//     .input("uid", uid)
//     .input("email", email)
//     .input("displayName", displayName)
//     .query(
//       "INSERT INTO users (uid, email, displayName) VALUES (@uid, @email, @displayName);"
//     );

//   // Lấy thông tin người dùng vừa tạo
//   return await getUserByUid(uid);
// };

// const createUser = async (uid, email, displayName) => {
//   const pool = await getPool();
//   const result = await pool
//     .request()
//     .input("uid", uid)
//     .input("email", email)
//     .input("displayName", displayName)
//     .query(
//       "INSERT INTO users (uid, email, displayName) OUTPUT INSERTED.* VALUES (@uid, @email, @displayName);"
//     );

//   return result.recordset[0];
// };

// Export singleton instance