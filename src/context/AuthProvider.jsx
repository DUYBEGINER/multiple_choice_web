import React, { useState, createContext, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { checkSession } from "../api/authAPI";

export const AuthContext = createContext();

function AuthProvider({ children }) {
  const navigate = useNavigate();
  const location = useLocation();

  const [user, setUser] = useState(null); // null = chưa đăng nhập
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkUser() {
      try {
        const user = await checkSession("AuthProvider"); // gọi API backend
        setUser(user);
        if (user) {
          if (
            location.pathname === "/login" ||
            location.pathname === "/signup"
          ) {
            navigate("/quiz-creator", { replace: true });
          }
        }
        // Nếu đang ở /login hoặc /signup mà đã đăng nhập -> chuyển hướng
      } catch (err) {
        setUser(null);

        // Nếu chưa login mà vào trang khác -> bắt về login
        if (location.pathname !== "/login" && location.pathname !== "/signup") {
          navigate("/login", { replace: true });
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
