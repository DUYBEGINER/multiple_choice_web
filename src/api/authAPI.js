import axios from 'axios';
import { API_URL } from '../utils/API_URL';

const getUser = async (idToken) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, {token: idToken}, { 
        headers: {
            Authorization: `Bearer ${idToken}`,
            "Content-Type": "application/json"  // Tùy chọn
        }
    });
    console.log('Login response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

const signUpRequest = async (idToken) => {
  try {
    const response = await axios.post(`${API_URL}/auth/signup`, {token: idToken}, {
         headers: {
            Authorization: `Bearer ${idToken}`,
            "Content-Type": "application/json"  // Tùy chọn
        }
  });
  console.log('Sign up response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error signing up:', error);
    throw error;
  }
};

export { getUser, signUpRequest };