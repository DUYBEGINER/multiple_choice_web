import { getPool } from "../db/config.js";

const getUserByUid = async (uid) => {
  const pool = await getPool();
  const result = await pool
    .request()
    .input("uid", uid)
    .query("SELECT * FROM users WHERE uid = @uid;");
  return result.recordset[0] || null;
};

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

const createUser = async (uid, email, displayName) => {
  const pool = await getPool();
  const result = await pool
    .request()
    .input("uid", uid)
    .input("email", email)
    .input("displayName", displayName)
    .query(
      "INSERT INTO users (uid, email, displayName) OUTPUT INSERTED.* VALUES (@uid, @email, @displayName);"
    );

  return result.recordset[0];
};

export { getUserByUid, createUser };