import React from "react";
import { Outlet, Navigate } from "react-router-dom";

export default function PrivateRoute() {
  const currentUser = localStorage.getItem("token");

  // Check if currentUser (token) exists to determine authentication
  const isAuthenticated = !!currentUser;

  return isAuthenticated ? <Outlet /> : <Navigate to="/signin" />;
}
