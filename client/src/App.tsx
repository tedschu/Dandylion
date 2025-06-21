import { useEffect, useState } from "react";
import "./index.css";
import DestinationUnknown from "./pages/DestinationUnknown";
import { apiResponse } from "./types/types";
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

function App() {
  const storedToken = localStorage.getItem("token");

  return (
    <>
      <AuthProvider>
        <QuestionsResponsesProvider>
          <AppProvider>
            <Routes>
              <Route index element={<Home />} />

              <Route path="/path" element={<Path />} />

              <Route path="/build-plan" element={<DestinationKnown />} />
              <Route
                path="/find-destination"
                element={<DestinationUnknown />}
              />

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
          </AppProvider>
        </QuestionsResponsesProvider>
      </AuthProvider>
    </>
  );
}

export default App;
