import { AuthContext } from "./AuthContext";
import { useState } from "react";

export default function AuthProvider({ children }) {
  // In-Memory Token
  const [token, setToken] = useState(null);

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
}
