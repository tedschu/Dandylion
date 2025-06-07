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
import Path from "./pages/Path";
import DestinationKnown from "./pages/DestinationKnown";
import { AuthProvider } from "./contexts/AuthContext";
import { QuestionsResponsesProvider } from "./contexts/QuestionsResponsesContext";
import { AppProvider } from "./contexts/AppContext";

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
              <Route path="/me" element={<Me />} />
              <Route
                path="/your-destination-plan"
                element={<ResultsDestinationUnknown />}
              />
              <Route path="/your-plan" element={<ResultsDestinationKnown />} />
            </Routes>
          </AppProvider>
        </QuestionsResponsesProvider>
      </AuthProvider>
    </>
  );
}

export default App;
