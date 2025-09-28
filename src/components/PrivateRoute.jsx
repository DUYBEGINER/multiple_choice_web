import { Navigate } from "react-router-dom";
import useAuth from "../hook/useAuth";
import { PATHS } from "../data/routePaths";
export function PrivateRoute({ children }) {
    const { user, loading } = useAuth();

    if (loading) return <div>Loading...</div>;
    if (!user) return <Navigate to={PATHS.AUTH.LOGIN} replace />;

    return children ? children : <Outlet />;
}

// AuthRoute cho các route chỉ dành cho chưa login (như login/signup)
export function AuthRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <div>Loading...</div>;
  if (user) return <Navigate to={PATHS.QUIZ} replace />;
  return children ? children : <Outlet />;
}