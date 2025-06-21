import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
  useEffect,
} from "react";
import { UserInfo } from "../types/types";
import { useNavigate } from "react-router-dom";

type AuthContextType = {
  userInfo: UserInfo;
  setUserInfo: React.Dispatch<React.SetStateAction<UserInfo>>;
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  token: string;
  setToken: React.Dispatch<React.SetStateAction<string>>;
  logout: () => void;
  checkTokenExpiration: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthProviderProps = {
  children: ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  // Get stored token from localStorage
  const storedToken = localStorage.getItem("token");
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState<UserInfo>({
    firstName: "",
    email: "",
    password: "",
  });

  const [isLoggedIn, setIsLoggedIn] = useState(!!storedToken);
  const [token, setToken] = useState(storedToken || "");

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    setToken("");
    setIsLoggedIn(false);
    setUserInfo({
      firstName: "",
      email: "",
      password: "",
    });
    navigate("/");
  }, [navigate]);

  const isTokenExpired = useCallback((tokenToCheck: string) => {
    try {
      const payloadBase64 = tokenToCheck.split(".")[1];
      const decodedJson = atob(payloadBase64);
      const decoded = JSON.parse(decodedJson);
      const exp = decoded.exp;

      // Check if the expiration time is past
      return Date.now() >= exp * 1000;
    } catch (error) {
      console.error("Error checking token expiration:", error);
      return true; // Treat malformed tokens as expired
    }
  }, []);

  const checkTokenExpiration = useCallback(() => {
    if (token && isTokenExpired(token)) {
      logout();
    }
  }, [token, isTokenExpired, logout]);

  // Check token expiration on mount and whenever token changes
  useEffect(() => {
    if (token) {
      checkTokenExpiration();
    }
  }, [token, checkTokenExpiration]);

  const value = {
    userInfo,
    setUserInfo,
    isLoggedIn,
    setIsLoggedIn,
    token,
    setToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Custom hook for the auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
