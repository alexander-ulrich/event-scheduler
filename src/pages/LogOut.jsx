import { useNavigate } from "react-router";
import {
  getFromLocalStorage,
  removeFromLocalStorage,
} from "../utils/localStorageAccess";
import { useEffect } from "react";
import { useAuthContext } from "../contexts";

//Logout: setzt Token im Context und in localStorage auf null, navigiert zur Startseite
export default function LogOut() {
  const navigate = useNavigate();
  const { setToken } = useAuthContext();

  function logOutRequest() {
    if (getFromLocalStorage("credentials")) {
      removeFromLocalStorage("credentials");
    }
    setToken(null);
  }
  //Redirect 
  useEffect(() => {
    logOutRequest();
    navigate("/");
  }, []);
  return <div>Logout</div>;
}
