import type { JSX } from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

export function ProtectedRoute({ children }: { children: JSX.Element }) {
  const token = Cookies.get("token");

  if (!token) {
    return <Navigate to="/signin" replace />;
  }

  return children;
}
