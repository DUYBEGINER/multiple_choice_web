import axios from 'axios';
import {axiosClient} from "../utils/axiosClient";



const checkSession = async () => {
  try {
    const res = await axiosClient.get("/me");
    return res.data.user;
  } catch (err) {
    return null;
  }
}

const signInRequest = async (idToken) => {
   const res = await axiosClient.post(`/auth/login`, {}, {
    headers: { Authorization: `Bearer ${idToken}` },
  });
  if (!res.ok) throw new Error("Login failed");
  return res.data;
};

const signUpRequest = async (idToken, displayName) => {
  const res = await axiosClient.post(`/auth/signup`, { displayName }, {
    headers: { Authorization: `Bearer ${idToken}` },
  });
   if (!res.ok) throw new Error("Signup failed");
  return res.data;
};


const logOutRequest = async () => {
  const res = await axiosClient.post(`/auth/logout`);
  return res.data;
}

export { signInRequest, signUpRequest, logOutRequest , checkSession};