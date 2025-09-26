import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";

export default function PrivateRoute({ children }) {
    const { user, loading } = useContext(AuthContext);

    if (loading) return <div>Loading...</div>;
    if (!user) return <Navigate to="/auth/login" replace />;


    return children ? children : <Outlet />;
}

// AuthRoute cho các route chỉ dành cho chưa login (như login/signup)
export function AuthRoute({ children }) {
  const { user, loading } = useContext(AuthContext);
  if (loading) return <div>Loading...</div>;
  if (user) return <Navigate to="/quiz-creator" replace />;
  return children ? children : <Outlet />;
}