import React, { memo } from "react";
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../../hook/useAuth";
import  LoadingSpinner  from "../LoadingSpinner";
import { PATHS } from "../../data/routePaths";

const PrivateRoute = ({ children, redirectTo = PATHS.AUTH.LOGIN }) => {
  const { user, loading, authenticate } = useAuth();
  const location = useLocation();

  console.log("PrivateRoute render", { user, loading, authenticate });
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="large" />
      </div>
    );
  }
  if (!user)
    return (
      <Navigate to={redirectTo} state={{ from: location }} replace />
    );

  return children;
}

PrivateRoute.displayName = 'PrivateRoute';

export default PrivateRoute;
