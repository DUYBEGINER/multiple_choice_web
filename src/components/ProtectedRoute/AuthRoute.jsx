import React, {memo} from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../../hook/useAuth";
import LoadingSpinner from "../LoadingSpinner";
import { PATHS } from "../../data/routePaths";

// AuthRoute cho các route chỉ dành cho chưa login (như login/signup)
const AuthRoute = memo(({ children , redirectTo = PATHS.QUIZ}) => {
  const { user, loading, authenticate } = useAuth();
  if (loading)  return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="large" />
      </div>
    );


  if (user) return <Navigate to={redirectTo} replace />;
  return children;
});

AuthRoute.displayName = 'AuthRoute';

export default AuthRoute;