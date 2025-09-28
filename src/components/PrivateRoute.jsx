import { Navigate } from "react-router-dom";
import { useContext } from "react";
import useAuth from "../hook/useAuth";

export default function PrivateRoute({ children }) {
    const { user, loading } = useAuth();

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