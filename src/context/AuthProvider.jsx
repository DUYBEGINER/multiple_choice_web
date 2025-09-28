import React, { useState, createContext, useEffect } from "react";
import { checkSession } from "../api/authAPI";
import {AuthContext} from "./AuthContext";

function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // null = chưa đăng nhập
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      let isMounted = true;
      async function checkUser() {
        try {
          const res = await checkSession("AuthProvider"); // gọi API backend
          const data = res?.data ?? null;
          console.log("user in auth provider:", res.data);
         
          if (!isMounted) return;
          if (data) {
            setUser(data); //Cập nhật user
          }else{
            setUser(null);
          }
        } catch (error) {
          console.error("Error checking session:", error);
          setUser(null);
        } finally {
          setLoading(false);
        }
      }
      checkUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, setUser }}>
      {loading ? <div>Loading...</div> : children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
