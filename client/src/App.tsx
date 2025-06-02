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
    password: "",
  });

  const [questionPromptsUnknown, setQuestionPromptsUnknown] = useState({
    question1:
      "Let's get started. Are you traveling solo, with a partner, friends, or family?",
    question2:
      "What's your budget range, and what aspects of travel do you prioritize spending on?",
    question3:
      "What was your favorite vacation experience so far, and what made it special?",
    question4:
      "What's something you've always wanted to do but haven't had the chance to try yet (or just haven't done in a while)?",
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

  const [questionPromptsKnown, setQuestionPromptsKnown] = useState({
    question1:
      "What's your trip looking like so far? Tell us about your destination(s), dates, or other big plans.",
    question2:
      "What's your budget range, and what aspects of travel do you prioritize spending on (food, activities, accommodations)?",
    question3: "Are you traveling solo, with a partner, friends, or family?",
    question4:
      "What are you most excited to see or do? This could be specific attractions you've already planned or general interests like food, culture, nightlife, etc.",
    question5:
      "Are you interested in staying mostly in your main destination or exploring surrounding areas and day trips too?",
    question6:
      "What's your preferred pace - packed itineraries and lots of activities, or more leisurely with downtime built in?",
    question7:
      "What are you hoping to get out of this trip personally? For example, relaxation, new perspectives, adventure, cultural immersion, or something else entirely?",
    question8:
      "Last question: Any dietary preferences, restrictions, or food experiences you're particularly excited about?",
  });

  // Used to render step pages based on user's progression
  const [currentStep, setCurrentStep] = useState(1);

  const [apiResponse, setApiResponse] = useState<apiResponse>({});
  // Shows BadWordsAlert component in question paths if a user types a "bad word"
  const [showBadWordsAlert, setShowBadWordsAlert] = useState(false);
  const [showAPIErrorMessage, setShowAPIErrorMessage] = useState(false);

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
              questionPromptsUnknown={questionPromptsUnknown}
              setQuestionPromptsUnknown={setQuestionPromptsUnknown}
              apiResponse={apiResponse}
              setApiResponse={setApiResponse}
              userInfo={userInfo}
              setUserInfo={setUserInfo}
            />
          }
        />

        <Route path="/path" element={<Path />} />

        <Route
          path="/build-plan"
          element={
            <DestinationKnown
              currentStep={currentStep}
              setCurrentStep={setCurrentStep}
              userResponses={userResponses}
              setUserResponses={setUserResponses}
              questionPromptsKnown={questionPromptsKnown}
              setQuestionPromptsKnown={setQuestionPromptsKnown}
              apiResponse={apiResponse}
              setApiResponse={setApiResponse}
              userInfo={userInfo}
              setUserInfo={setUserInfo}
              showBadWordsAlert={showBadWordsAlert}
              setShowBadWordsAlert={setShowBadWordsAlert}
            />
          }
        />
        <Route
          path="/find-destination"
          element={
            <DestinationUnknown
              currentStep={currentStep}
              setCurrentStep={setCurrentStep}
              userResponses={userResponses}
              setUserResponses={setUserResponses}
              questionPromptsUnknown={questionPromptsUnknown}
              setQuestionPromptsUnknown={setQuestionPromptsUnknown}
              apiResponse={apiResponse}
              setApiResponse={setApiResponse}
              userInfo={userInfo}
              setUserInfo={setUserInfo}
              showBadWordsAlert={showBadWordsAlert}
              setShowBadWordsAlert={setShowBadWordsAlert}
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
              apiResponse={apiResponse}
              setApiResponse={setApiResponse}
              userInfo={userInfo}
              questionPromptsUnknown={questionPromptsUnknown}
              showAPIErrorMessage={showAPIErrorMessage}
              setShowAPIErrorMessage={setShowAPIErrorMessage}
            />
          }
        />
        <Route
          path="/your-plan"
          element={
            <ResultsDestinationKnown
              currentStep={currentStep}
              setCurrentStep={setCurrentStep}
              userResponses={userResponses}
              setUserResponses={setUserResponses}
              apiResponse={apiResponse}
              setApiResponse={setApiResponse}
              userInfo={userInfo}
              questionPromptsKnown={questionPromptsKnown}
              showAPIErrorMessage={showAPIErrorMessage}
              setShowAPIErrorMessage={setShowAPIErrorMessage}
            />
          }
        />
      </Routes>
    </>
  );
}

export default App;
