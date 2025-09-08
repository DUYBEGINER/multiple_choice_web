// import React, {useState, createContext, useEffect} from 'react';
// import {useNavigate} from 'react-router-dom';
// import { useLocation } from 'react-router-dom';
// import { checkSession } from '../api/authAPI';

// export const AuthContext = createContext();

// function AuthProvider({children}) {
//     const navigate = useNavigate();
//     const location = useLocation();

//     const key = Object.keys(localStorage).find(k => k.includes("firebase:authUser"));
//     console.log("JSON: ",JSON.parse(localStorage.getItem(key)));

//     const [user, setUser] = useState({});
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         async function checkUser() {
//             try {
//                 const user = await checkSession();
//                 setUser(user);
//                 if (location.pathname === "/login" || location.pathname === "/signup") {
//                 navigate("/quiz-creator", { replace: true });
//                 }
//             } catch (err) {
//                 setUser(null);
//                 if (location.pathname !== "/login" && location.pathname !== "/signup") {
//                 navigate("/login", { replace: true });
//                 }
//             } finally {
//                 setLoading(false);
//             }
//         }
//         checkUser();
//   }, [navigate]);
//     // useEffect(() => {
//     //     const unsubscribe = auth.onAuthStateChanged((user) => {
//     //         setUser(user);
//     //         if(user){
//     //             navigate('/quiz-creator', { replace: true });
//     //         }else{
//     //             setUser({});
//     //             if(location.pathname !== '/signup' && location.pathname !== '/login'){
//     //                 navigate('/login', { replace: true });
//     //             }
//     //         }
//     //         setLoading(false);
//     //     })
//     //     //Clean function
//     //     return () => unsubscribe();
//     // }, [navigate])

//     return (
//         <AuthContext.Provider value={{ user, loading }}>
//             {loading ? <div>Loading...</div> : children}
//         </AuthContext.Provider>
//     );
// }

// export default  AuthProvider;
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
