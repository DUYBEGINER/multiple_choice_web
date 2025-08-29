import {createUserWithEmailAndPassword, signInWithEmailAndPassword , signOut, updateProfile} from "firebase/auth";
import { auth } from "./firebaseConfig";

export const signUp = async (email, password, displayName) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    // Signed up
    const user = userCredential.user;
    await updateProfile(user, { displayName });
    console.log("upodate!")
    return user;
  } catch (error) {
    // Handle Errors here.
      console.error("Error signing up:", error);
    return error;
  }
}

export const login = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    // Logged in
    const user = userCredential.user;

    const token = await user.getIdToken();
    console.log("IdToken: ", token);
    
    return user;
  } catch (error) {
    // Handle Errors here.
 
    return error;
  }
}


export const logout = async () => {
    await signOut(auth);
}