import { useEffect, useState } from "react";
import "./index.css";
import DestinationUnknown from "./pages/DestinationUnknown";
import { Plan } from "./types/types";
import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Me from "./pages/Me";
import ResultsDestinationKnown from "./pages/ResultsDestinationKnown";
import ResultsDestinationUnknown from "./pages/ResultsDestinationUnknown";
import PlanDetail from "./pages/PlanDetail";
import Path from "./pages/Path";
import DestinationKnown from "./pages/DestinationKnown";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { QuestionsResponsesProvider } from "./contexts/QuestionsResponsesContext";
import { AppProvider } from "./contexts/AppContext";
import Register from "./pages/Register";

// Component that handles user data fetching
function AppContent() {
  const { setUserInfo, setIsLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  const getUserData = async () => {
    const storedToken = localStorage.getItem("token");

    if (!storedToken) {
      setIsLoggedIn(false);
      setIsLoading(false);
      return;
    }

    try {
      // Replace with your actual API endpoint
      const response = await fetch("/api/users/me", {
        headers: {
          Authorization: `Bearer ${storedToken}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const userData = await response.json();
        setUserInfo(userData);
        setIsLoggedIn(true);
      } else {
        // Token is invalid or expired
        localStorage.removeItem("token");
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      localStorage.removeItem("token");
      setIsLoggedIn(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="/path" element={<Path />} />
      <Route path="/build-plan" element={<DestinationKnown />} />
      <Route path="/find-destination" element={<DestinationUnknown />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/me" element={<Me />} />
      <Route
        path="/your-destination-plan"
        element={<ResultsDestinationUnknown />}
      />
      <Route path="/your-plan" element={<ResultsDestinationKnown />} />
      <Route path="/plans/:plan_id" element={<PlanDetail />} />
    </Routes>
  );
}

function App() {
  return (
    <>
      <AuthProvider>
        <QuestionsResponsesProvider>
          <AppProvider>
            <AppContent />
          </AppProvider>
        </QuestionsResponsesProvider>
      </AuthProvider>
    </>
  );
}

export default App;
