import {createUserWithEmailAndPassword, signInWithEmailAndPassword , signOut, updateProfile} from "firebase/auth";
import { auth } from "./firebaseConfig";
import { getAuth } from "firebase/auth";

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

export const getIdTokenForLogout = async () => {
  const auth = getAuth();
  const user = auth.currentUser;
  if (!user) {
    // chờ init xong nếu F5 xong currentUser chưa sẵn sàng
    const { onAuthStateChanged } = "firebase/auth";
    await new Promise(resolve => {
      const unsub = onAuthStateChanged(auth, () => { unsub(); resolve(); });
    });
  }
  // true = force refresh (đảm bảo còn hạn)
  return await auth.currentUser.getIdToken(true);
}


//Verify email  when sign up
export const sendEmailVerification = async () => {
  if (auth.currentUser) {
    try {
      await auth.currentUser.sendEmailVerification();
      console.log("Email verification sent");
    } catch (error) {
      console.error("Error sending email verification:", error);
      throw error;
    }
  }
}
