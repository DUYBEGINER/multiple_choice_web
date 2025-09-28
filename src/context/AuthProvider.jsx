import React, { useState, createContext, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { checkSession } from "../api/authAPI";
import {AuthContext} from "./AuthContext";

const pagesAllow = [
  "/auth/login",
  "/auth/signup",
  "/auth/forgot-password",
  "/auth/reset-password",
  "/auth/email-confirmation",
];


function AuthProvider({ children }) {
  const navigate = useNavigate();
  const location = useLocation();

  const [user, setUser] = useState(null); // null = chưa đăng nhập
  const [loading, setLoading] = useState(true);

 

  useEffect(() => {
      async function checkUser() {
        try {
          const res = await checkSession("AuthProvider"); // gọi API backend
          console.log("user in auth provider:", res.data);
          if (res?.data) {
            setUser(res.data); //Cập nhật user
          }
        } catch (error) {
          setUser(null);
        } finally {
          setLoading(false);
        }
      }
      checkUser();
  }, [navigate, location]);

  return (
    <AuthContext.Provider value={{ user, loading, setUser }}>
      {loading ? <div>Loading...</div> : children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
