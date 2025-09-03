import axios from 'axios';
import {axiosClient} from "../utils/axiosClient";



const checkSession = async () => {
  try {
    const res = await axiosClient.get("/auth/me");
    console.log("res check session:", res)
    return res.data.user;
  } catch (err) {
    return null;
  }
}

const signInRequest = async (idToken) => {
   const res = await axiosClient.post(`/auth/login`, {}, {
    headers: { Authorization: `Bearer ${idToken}` },
  });
  console.log("res login:" , res.ok)
  return res.data;
};

const signUpRequest = async (idToken, displayName) => {
  const res = await axiosClient.post(`/auth/signup`, { displayName }, {
    headers: { Authorization: `Bearer ${idToken}` },
  });
  console.log("res signup:" , res)
  return res.data;
};


const logOutRequest = async () => {
  const res = await axiosClient.post(`/auth/logout`);
  return res.data;
}

export { signInRequest, signUpRequest, logOutRequest , checkSession};