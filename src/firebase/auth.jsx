import {createUserWithEmailAndPassword, signInWithEmailAndPassword , signOut, updateProfile} from "firebase/auth";
import { auth } from "./firebaseConfig";


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

