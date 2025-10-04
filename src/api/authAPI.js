import axios from 'axios';
import {axiosClient} from "../utils/axiosClient";


const checkSession = async (component) => {
  try {
    // console.log("component call api:", component);
    const datenow = new Date().toLocaleString();
    const res = await axiosClient.get("/auth/me");
    if (res && res.data) {
      console.log(`Response from checkSession: [${datenow}]`, res.data);
      return res.data; // Trả về dữ liệu user
    }
     return { success: false, data: null };
  } catch (err) {
    console.error("Error checking session:", err.response?.status, err.response?.data);

    // 401/403 là trường hợp bình thường (chưa login hoặc session hết hạn)
    // KHÔNG throw error, return success: false
    if (err.response?.status === 401 || err.response?.status === 403) {
      return { success: false, data: null };
    }

    // Các lỗi khác (500, network error...) mới throw
    throw new Error(err.response?.data?.message || 'Error checking session');
  }
}

const authRequest = async (idToken) => {
   const res = await axiosClient.post(`/auth/login`, {}, {
    headers: { Authorization: `Bearer ${idToken}` },
  });
  console.log("res login:" , res.data)
  return res.data;
};

const logOutRequest = async (idToken) => {
  const res = await axiosClient.post(`/auth/logout`, {}, {
    headers: { Authorization: `Bearer ${idToken}` },
  });
  console.log("res logout:", res)
  return res.data;
}

export { authRequest, logOutRequest , checkSession};