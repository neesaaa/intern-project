import { Navigate, Outlet } from "react-router-dom";
import { tokenValidAtom } from "../atoms/authAtom";
import { useAtom } from "jotai";

export default function ProtectedRoute() {
  const [isAuthenticated] = useAtom(tokenValidAtom);
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}
