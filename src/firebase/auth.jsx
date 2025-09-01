import {createUserWithEmailAndPassword, signInWithEmailAndPassword , signOut, updateProfile} from "firebase/auth";
import { auth } from "./firebaseConfig";
// export const signUp = async (email, password, displayName) => {
//   try {
//     const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//     // Signed up
//     const user = userCredential.user;
//     const token = await user.getIdToken();
//     await updateProfile(user, { displayName });
//     console.log("upodate!")
//     return token;
//   } catch (error) {
//     // Handle Errors here.
//       console.error("Error signing up:", error);
//     return error;
//   }
// }


export const getTokenSignInWithEmailAndPassword = async (email, password) => {
  try {
    const {user} = await signInWithEmailAndPassword(auth, email, password);
    // Get idToken
    const idToken = await user.getIdToken();
    return idToken;
  } catch (error) {
    console.error("Error signing in:", error);
    throw error;
  }
}


export const getTokenSignUpWithEmailAndPassword = async (email, password, displayName) => {
  try {
    const {user} = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(user, { displayName });
    const idToken = await user.getIdToken(true); // force refresh
    return idToken;
  } catch (error) {
    console.error('Error signing up:', error);
    throw error;
  }
}

