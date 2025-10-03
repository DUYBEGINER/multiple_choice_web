import {authRequest,  logOutRequest} from '../api/authAPI';
import { getTokenSignInWithEmailAndPassword, 
        getTokenSignUpWithEmailAndPassword,
        getIdTokenForLogout,
        logOut
    } from '../firebase/firebaseService';

export const loginWithEmailAndPassword = async (email, password) => {
    try{
        // Get id token from Firebase
        const token = await getTokenSignInWithEmailAndPassword(email, password);

        // Authenticate with backend
        const response = await authRequest(token);
        if (!response?.success || !response?.data) {
            throw new Error('Failed to retrieve user information');
        }
        return response.data;

    } catch (error) {
        //Handle error at here
        throw new Error(error.message || 'Login failed. Please try again.');
    }
}

export const signupWithEmailAndPassword = async (email, password, displayName) => {
    try{
          // Sign up and get id token from Firebase
        const token = await getTokenSignUpWithEmailAndPassword(email, password, displayName);

         // Authenticate with backend
        const response = await authRequest(token);
        if (!response?.success || !response?.data) {
            throw new Error('Failed to retrieve user information');
        }
        return response.data;
    } catch (error) {
        // Handle error at here
        throw new Error(error.message || 'Sign up failed. Please try again.');
    }
}

export const logoutUser = async () => {
    try{
        const idToken = await getIdTokenForLogout();
        await logOutRequest(idToken);
        await logOut();
        
    } catch (error){
        throw new Error(error.message || 'Logout failed. Please try again.');
    }
}