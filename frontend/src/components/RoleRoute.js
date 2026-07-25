import React from "react";
import { Navigate } from "react-router-dom";

const RoleRoute = ({ allowedRoles = [], children }) => {
  const userRole = localStorage.getItem("role");

  if (!userRole || !allowedRoles.includes(userRole)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default RoleRoute;
