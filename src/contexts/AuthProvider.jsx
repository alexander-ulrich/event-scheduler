import { getToken } from "../utils/localStorageAccess";
import { AuthContext } from ".";
import { useEffect, useState } from "react";

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => getToken());
  // set global Authentication-State (token) from LocalStorage every time token is changed
  useEffect(() => {
    async function auth() {
      setToken(getToken());
      console.log("Token from AuthProvider: " + token);
    }
    auth();
  }, [token]);
  // Provide token and setToken to Children
  return <AuthContext value={{ token, setToken }}>{children}</AuthContext>;
};

export default AuthProvider;
