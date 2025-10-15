import { createContext, useContext } from "react";

// Named Export: AuthContext
export const AuthContext = createContext(null);

// Hook für einfaches Verwenden
export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
}
