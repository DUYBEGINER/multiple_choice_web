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

export const signUp = async (email, password, displayName) => {
  try {
    const {user} = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(user, { displayName });
     
    const token = await user.getIdToken(true); // force refresh
    return token;
  } catch (error) {
    console.error('Error signing up:', error);
    throw error;
  }
}


export const signIn = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    // Logged in
    const user = userCredential.user;

    const token = await user.getIdToken();

    return token;
  } catch (error) {
    // Handle Errors here.
    return error;
  }
}


export const logout = async () => {
    await signOut(auth);
}