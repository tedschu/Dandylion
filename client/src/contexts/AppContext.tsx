import React, { createContext, useContext, useState, ReactNode } from "react";
import { Plan, PlanShareData } from "../types/types";

type AppContextType = {
  plan: Plan | null;
  setPlan: React.Dispatch<React.SetStateAction<Plan | null>>;
  showBadWordsAlert: boolean;
  setShowBadWordsAlert: React.Dispatch<React.SetStateAction<boolean>>;
  showAPIErrorMessage: boolean;
  setShowAPIErrorMessage: React.Dispatch<React.SetStateAction<boolean>>;
  planShareData: PlanShareData;
  setPlanShareData: React.Dispatch<React.SetStateAction<PlanShareData>>;
  isShareModalOpen: boolean;
  setIsShareModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  shouldRefreshPlans: boolean;
  setShouldRefreshPlans: React.Dispatch<React.SetStateAction<boolean>>;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

type AppProviderProps = {
  children: ReactNode;
};

export function AppProvider({ children }: AppProviderProps) {
  const [plan, setPlan] = useState<Plan | null>(null);
  // Shows BadWordsAlert component in question paths if a user types a "bad word"
  const [showBadWordsAlert, setShowBadWordsAlert] = useState(false);
  const [showAPIErrorMessage, setShowAPIErrorMessage] = useState(false);
  // To store plan_id and destination to help load the SharePlan component
  const [planShareData, setPlanShareData] = useState<PlanShareData>({
    planID: null,
    destination: "",
  });
  // Governs whether the SharePlan modal is open, for a user to share a plan with other users
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  // Governs whether to re-render plans after a user shares plans
  // (e.g. will render the emails they just shared with)
  const [shouldRefreshPlans, setShouldRefreshPlans] = useState(false);

  const value = {
    plan,
    setPlan,
    showBadWordsAlert,
    setShowBadWordsAlert,
    showAPIErrorMessage,
    setShowAPIErrorMessage,
    planShareData,
    setPlanShareData,
    isShareModalOpen,
    setIsShareModalOpen,
    shouldRefreshPlans,
    setShouldRefreshPlans,
  };

  console.log(plan);

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
