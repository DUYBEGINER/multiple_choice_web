import app from "./firebaseConfig";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";



const auth = getAuth(app);



export const signUp = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    // Signed up
    const user = userCredential.user;
    return user;
  } catch (error) {
    // Handle Errors here.
    return error;
  }
}

export const login = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    // Logged in
    const user = userCredential.user;
    return user;
  } catch (error) {
    // Handle Errors here.
    return error;
  }
}

