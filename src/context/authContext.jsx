import { createContext, useContext, useState } from "react";
import { getAuthToken, getUserName } from "../utils/auth";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => getAuthToken());
  const [username, setUsername] = useState(() => getUserName());

  const login = (newToken, newUsername) => {
    setToken(newToken);
    if (newUsername) setUsername(newUsername);
  };

  const logout = () => {
    setToken(null);
    setUsername(null);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        username,
        isAuthenticated: !!token,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth должен быть в AuthProvider");
  return context;
}
