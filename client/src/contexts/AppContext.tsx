import React, { createContext, useContext, useState, ReactNode } from "react";
import { apiResponse } from "../types/types";

type AppContextType = {
  apiResponse: apiResponse;
  setApiResponse: React.Dispatch<React.SetStateAction<apiResponse>>;
  showBadWordsAlert: boolean;
  setShowBadWordsAlert: React.Dispatch<React.SetStateAction<boolean>>;
  showAPIErrorMessage: boolean;
  setShowAPIErrorMessage: React.Dispatch<React.SetStateAction<boolean>>;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

type AppProviderProps = {
  children: ReactNode;
};

export function AppProvider({ children }: AppProviderProps) {
  const [apiResponse, setApiResponse] = useState<apiResponse>({});
  // Shows BadWordsAlert component in question paths if a user types a "bad word"
  const [showBadWordsAlert, setShowBadWordsAlert] = useState(false);
  const [showAPIErrorMessage, setShowAPIErrorMessage] = useState(false);

  const value = {
    apiResponse,
    setApiResponse,
    showBadWordsAlert,
    setShowBadWordsAlert,
    showAPIErrorMessage,
    setShowAPIErrorMessage,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

// Custom hook for the auth context
export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AuthProvider");
  }
  return context;
}
