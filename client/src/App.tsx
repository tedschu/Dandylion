import { useState } from "react";
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

function App() {
  const [userResponses, setUserResponses] = useState({
    response1: "",
    response2: "",
    response3: "",
    response4: "",
    response5: "",
    response6: "",
    response7: "",
    response8: "",
    response9: "",
    response10: "",
  });

  const [userInfo, setUserInfo] = useState({
    firstName: "",
    email: "",
  });

  const [questionPrompts, setQuestionPrompts] = useState({
    question1:
      "Let's get started. Are you traveling solo, with a partner, friends, or family?",
    question2:
      "What's your budget range, and what aspects of travel do you prioritize spending on?",
    question3:
      "What was your favorite vacation experience so far, and what made it special?",
    question4:
      "What's something you've always wanted to do but haven't had the chance to try yet?",
    question5:
      "What climate do you prefer, and are there specific seasonal experiences you're seeking (fall foliage, winter sports, etc.)?",
    question6:
      "Are you drawn to natural landscapes, cultural experiences, urban environments, or a particular combination?",
    question7: "When are you planning to travel and for how long?",
    question8: "What's your ideal balance between relaxation and adventure?",
    question9: "Where are you located? This will help with cost estimates.",
    question10:
      "Are there any accessibility needs, dietary restrictions, or travel limitations I should know about?",
  });

  // Used to render step pages based on user's progression
  const [currentStep, setCurrentStep] = useState(1);

  const [apiResponse, setApiResponse] = useState<apiResponse>({});

  return (
    <>
      <Routes>
        <Route
          index
          element={
            <Home
              currentStep={currentStep}
              setCurrentStep={setCurrentStep}
              userResponses={userResponses}
              setUserResponses={setUserResponses}
              questionPrompts={questionPrompts}
              setQuestionPrompts={setQuestionPrompts}
              apiResponse={apiResponse}
              setApiResponse={setApiResponse}
              userInfo={userInfo}
              setUserInfo={setUserInfo}
            />
          }
        />

        <Route path="/path" element={<Path />} />

        <Route
          path="/destination-known"
          element={
            <DestinationKnown
              currentStep={currentStep}
              setCurrentStep={setCurrentStep}
              userResponses={userResponses}
              setUserResponses={setUserResponses}
              questionPrompts={questionPrompts}
              setQuestionPrompts={setQuestionPrompts}
              apiResponse={apiResponse}
              setApiResponse={setApiResponse}
              userInfo={userInfo}
              setUserInfo={setUserInfo}
            />
          }
        />
        <Route
          path="/destination-unknown"
          element={
            <DestinationUnknown
              currentStep={currentStep}
              setCurrentStep={setCurrentStep}
              userResponses={userResponses}
              setUserResponses={setUserResponses}
              questionPrompts={questionPrompts}
              setQuestionPrompts={setQuestionPrompts}
              apiResponse={apiResponse}
              setApiResponse={setApiResponse}
              userInfo={userInfo}
              setUserInfo={setUserInfo}
            />
          }
        />

        <Route path="/login" element={<Login />} />
        <Route path="/me" element={<Me />} />
        <Route
          path="/your-destination-plan"
          element={
            <ResultsDestinationUnknown
              currentStep={currentStep}
              setCurrentStep={setCurrentStep}
              userResponses={userResponses}
              setUserResponses={setUserResponses}
              questionPrompts={questionPrompts}
              setQuestionPrompts={setQuestionPrompts}
              apiResponse={apiResponse}
              setApiResponse={setApiResponse}
            />
          }
        />
        <Route path="/your-plan" element={<ResultsDestinationKnown />} />
      </Routes>
    </>
  );
}

export default App;
