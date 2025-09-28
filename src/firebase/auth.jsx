import {createUserWithEmailAndPassword, signInWithEmailAndPassword , signOut, updateProfile, sendPasswordResetEmail} from "firebase/auth";
import { auth } from "./firebaseConfig";
import { getAuth, verifyPasswordResetCode, confirmPasswordReset } from "firebase/auth";
import {} from "firebase/auth";
//Get token login 
export const getTokenSignInWithEmailAndPassword = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    // Get idToken
    const idToken = await userCredential.user.getIdToken();
    console.log("access token:", idToken);
    return idToken;
  } catch (error) {
    console.error("Error signing in:", error);
    throw error;
  }
}

//Get token sign up
export const getTokenSignUpWithEmailAndPassword = async (email, password, displayName) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(userCredential.user, { displayName });
    const idToken = await userCredential.user.getIdToken(true); // force refresh
    console.log("access token:", idToken);
    return idToken;
  } catch (error) {
    console.error('Error signing up:', error);
    throw error;
  }
}

// export const getIdTokenForLogout = async () => {
//   const auth = getAuth();
//   const user = auth.currentUser;
//   if (!user) {
//     // chờ init xong nếu F5 xong currentUser chưa sẵn sàng
//     const { onAuthStateChanged } = "firebase/auth";
//     await new Promise(resolve => {
//       const unsub = onAuthStateChanged(auth, () => { unsub(); resolve(); });
//     });
//   }
//   // true = force refresh (đảm bảo còn hạn)
//   return await auth.currentUser.getIdToken(true);
// }
export const getIdTokenForLogout = async () => {
  try {
    const user = auth.currentUser;
    if (user) {
      const token = await user.getIdToken();
      return token;
    } else {
      throw new Error("No user is currently signed in");
    }
  } catch (error) {
    console.error("Error getting token for logout:", error);
    throw error;
  }
}


//Send email to reset password
export const sendEmailResetPassword = async (email) => {
  sendPasswordResetEmail(auth, email)
  .then(() => {
    // Password reset email sent!
    // ..
    window.alert("Đã gửi email đặt lại mật khẩu! Vui lòng kiểm tra hộp thư đến của bạn.");
  })
  .catch((error) => {
    const errorMessage = error.message;
    window.alert("Lỗi khi gửi email đặt lại mật khẩu: " + errorMessage);
    // ..
  });
}
 
//Confrim password reset with oobCode and new password
export const confirmPasswordResetWithCode = async (oobCode, newPassword) => {
  // Xác nhận mã oobCode và đặt lại mật khẩu
  try {
    // 1. Xác minh mã (oobCode)
    const email = await verifyPasswordResetCode(auth, oobCode);
    console.log("Email associated with the reset code:", email);
     // 2. Xác nhận đặt lại mật khẩu với mật khẩu mới
    await confirmPasswordReset(auth, oobCode, newPassword);

  } catch (error) {
    let errorMessage = "Đã xảy ra lỗi khi đặt lại mật khẩu.";
    switch (error.code) {
            case 'auth/invalid-action-code':
                errorMessage = "Mã xác minh không hợp lệ hoặc đã hết hạn.";
                break;
            case 'auth/user-disabled':
                errorMessage = "Tài khoản người dùng đã bị vô hiệu hóa.";
                break;
            case 'auth/user-not-found':
                errorMessage = "Người dùng không tồn tại.";
                break;
            case 'auth/weak-password':
                errorMessage = "Mật khẩu quá yếu. Vui lòng chọn mật khẩu mạnh hơn.";
                break;
            // Thêm các trường hợp khác nếu cần
            default:
                break;
        }

    throw new Error(errorMessage);
  }
}

// Logout function
export const logOut = async () => {
  try {
    await signOut(auth);
    console.log("User signed out successfully");
  } catch (error) {
    console.error("Error signing out:", error);
    throw error;
  }
}