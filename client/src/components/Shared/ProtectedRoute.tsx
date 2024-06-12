import React from "react";
import { Navigate, useLocation } from "react-router-dom";
// import { isLoggedIn } from "../../api/authApi";

interface ProtectedRouteProps {
  element: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
  const location = useLocation();
  // const isAuthenticated = isLoggedIn();

  // if (!isAuthenticated) {
  //   return <Navigate to="/login" state={{ from: location }} replace />;
  // }

  return element;
};

export default ProtectedRoute;
