import { Navigate, Outlet } from "react-router";
import { getToken } from "../utils/localStorageAccess";
import { useAuthContext } from "../contexts";

export default function ProtectedLayout() {
  // const token = getToken();

  //Wir können über useAuthContext() global den state von "token" abrufen
  const { token } = useAuthContext();
  console.log("ProtectedLayout Token: " + token);

  //Wenn kein Token da ist → redirect zur Sign-In-Seite

  if (!token) {
    return <Navigate to="/sign-in" replace />;
  }

  // Wenn Token da → render die geschützte Seite
  return <Outlet />;
}
