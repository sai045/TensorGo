// AuthContext.js
import { createContext, useContext, useState } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}

const login = () => {};

const logout = () => {};

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  login,
  logout,
});

export const AuthProvider = ({ children }: any) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = () => {
    // Perform login actions and update isAuthenticated state
    setIsAuthenticated(true);
  };

  const logout = () => {
    // Perform logout actions and update isAuthenticated state
    setIsAuthenticated(false);
  };
  if (AuthContext) {
    return (
      <>
        <AuthContext.Provider
          value={{
            isAuthenticated,
            login,
            logout,
          }}
        >
          {children}
        </AuthContext.Provider>
      </>
    );
  }
};

export const useAuth = () => useContext(AuthContext);
