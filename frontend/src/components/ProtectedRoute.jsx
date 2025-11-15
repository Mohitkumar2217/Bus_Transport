import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useContext(AuthContext);

  // While auth state is loading, show nothing (or a loader)
  if (loading) return null; // or <div>Loading...</div>

  // If user is not logged in, redirect to login
  if (!user) return <Navigate to="/login" replace />;

  // Otherwise render the protected content
  return children;
}
