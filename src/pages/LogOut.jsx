import { useNavigate } from "react-router";
import {
  getFromLocalStorage,
  removeFromLocalStorage,
} from "../utils/localStorageAccess";
import { useEffect } from "react";
import { useAuthContext } from "../contexts";

//Logout: set AuthProvider token (state) to null and remove credentials from LocalStorage
export default function LogOut() {
  const navigate = useNavigate();
  const { setToken } = useAuthContext();

  function logOutRequest() {
    if (getFromLocalStorage("credentials")) {
      removeFromLocalStorage("credentials");
    }
    setToken(null);
  }
  //Redirect to Home after Logout
  useEffect(() => {
    logOutRequest();
    navigate("/");
  }, []);
  return <div>Logout</div>;
}
