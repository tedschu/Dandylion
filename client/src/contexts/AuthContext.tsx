import React, { createContext, useContext, useState, ReactNode } from "react";
import { UserInfo } from "../types/types";

type AuthContextType = {
  userInfo: UserInfo;
  setUserInfo: React.Dispatch<React.SetStateAction<UserInfo>>;
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  token: string;
  setToken: React.Dispatch<React.SetStateAction<string>>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthProviderProps = {
  children: ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  // Get stored token from localStorage
  const storedToken = localStorage.getItem("token");

  const [userInfo, setUserInfo] = useState<UserInfo>({
    firstName: "",
    email: "",
    password: "",
  });

  const [isLoggedIn, setIsLoggedIn] = useState(!!storedToken);
  const [token, setToken] = useState(storedToken || "");

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
