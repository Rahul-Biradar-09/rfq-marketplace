import { createContext, useContext, useEffect, useState } from "react";
import { clearAuth, getToken, getUser, saveAuth } from "../utils/auth";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(getToken());
  const [user, setUser] = useState(getUser());

  useEffect(() => {
    const storedToken = getToken();
    const storedUser = getUser();

    setToken(storedToken);
    setUser(storedUser);
  }, []);

  const login = (authToken, authUser) => {
    saveAuth(authToken, authUser);
    setToken(authToken);
    setUser(authUser);
  };

  const logout = () => {
    clearAuth();
    setToken(null);
    setUser(null);
  };

  const isAuthenticated = Boolean(token);

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};