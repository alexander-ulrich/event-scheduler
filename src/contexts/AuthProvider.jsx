import { getToken } from "../utils/localStorageAccess";
import { AuthContext } from "./AuthContext";
import { useEffect, useState } from "react";

export default function AuthProvider({ children }) {
  const [token, setToken] = useState(() => getToken() ?? null);
  // set global Authentication-State (token) from LocalStorage every time token is changed
  useEffect(() => {
    async function auth() {
      setToken(getToken());
      console.log("Token from AuthProvider: " + token);
    }
    auth();
  }, [token]);
  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
}
