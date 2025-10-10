import { Navigate, Outlet } from "react-router";
import { getToken } from "../utils/localStorageAccess";

export default function ProtectedLayout() {
  const token = getToken();

  //Wenn kein Token da ist → redirect zur Sign-In-Seite
  
  if (!token) {
    return <Navigate to="/sign-in" replace />;
  }

  // Wenn Token da → render die geschützte Seite
  return <Outlet />;
}