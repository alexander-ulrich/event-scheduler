import { createContext, use } from "react";

export const AuthContext = createContext();

export function useAuthContext() {
  const context = use(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used from withiin AuthProvider");
  }
  return context;
}

export { default as AuthProvider } from "./AuthProvider";
