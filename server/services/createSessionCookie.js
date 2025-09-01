// server/utils/session.js
import { getAuth } from "firebase-admin/auth";

/**
 * Tạo session cookie và set vào response
 * @param {Response} res - đối tượng Express response
 * @param {string} idToken - Firebase ID token từ client
 */
export async function createAndSetSessionCookie(res, idToken) {
  const expiresIn = parseInt(process.env.SESSION_EXPIRES_MS, 10) || 24 * 60 * 60 * 1000; // 1 ngày
  const sessionCookie = await getAuth().createSessionCookie(idToken, { expiresIn });

  res.cookie("session", sessionCookie, {
    maxAge: expiresIn,
    httpOnly: true,
    sameSite: "strict",
    path: "/",
  });
}