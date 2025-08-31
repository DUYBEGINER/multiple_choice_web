import axios from 'axios';
import { API_URL } from '../utils/API_URL';

const getUser = async (idToken) => {
   const res = await axios.post(`${API_URL}/auth/login`, null, {
    headers: { Authorization: `Bearer ${idToken}` }
  });
  return res.data;
};

const signUpRequest = async (idToken, displayName) => {
  const res = await axios.post(`${API_URL}/auth/signup`, { displayName }, {
    headers: { Authorization: `Bearer ${idToken}` }
  });
  return res.data;
};

export { getUser, signUpRequest };