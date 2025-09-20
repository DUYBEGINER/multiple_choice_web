import React, { useState, createContext, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { checkSession } from "../api/authAPI";

export const AuthContext = createContext();

function AuthProvider({ children }) {
  const navigate = useNavigate();
  const location = useLocation();

  const [user, setUser] = useState(null); // null = chưa đăng nhập
  const [loading, setLoading] = useState(true);

  const pagesAllow = ["/auth/login", "/auth/signup", "/auth/forgot-password", "/auth/reset-password", "/auth/email-confirmation"];

  useEffect(() => {
      async function checkUser() {
        try {
          const res = await checkSession("AuthProvider"); // gọi API backend
          console.log("user in auth provider:", res.data);
          if (res?.data) {
            setUser(res.data); //Cập nhật user
            // Nếu đang ở /login hoặc /signup mà đã đăng nhập -> chuyển hướng
            if (
              location.pathname === "/auth/login" ||
              location.pathname === "/auth/signup"
            ) {
              navigate("/quiz-creator", { replace: true });
            }
          }
      
        } catch (error) {
          setUser(null);
          // Nếu chưa login mà vào trang khác -> bắt về login
          if (!pagesAllow.includes(location.pathname)) {
            navigate("/auth/login", { replace: true });
          }
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
