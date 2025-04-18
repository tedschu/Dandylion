import { useState } from "react";
import "./index.css";
import Container from "./pages/Container";

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
    question5: "What kind of climate or season are you hoping to experience?",
    question6:
      "Are you drawn to natural landscapes, cultural experiences, or urban environments?",
    question7:
      "What's your timeframe, and when are you looking to go? For example, do you want to go for 7-10 days during the summer?",
    question8: "What's your ideal balance between relaxation and adventure?",
    question9: "Where are you located? This will help with cost estimates.",
  });

  const [currentStep, setCurrentStep] = useState(1);

  const [apiResponse, setApiResponse] = useState({});

  return (
    <>
      <div>
        <Container
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
          userResponses={userResponses}
          setUserResponses={setUserResponses}
          questionPrompts={questionPrompts}
          setQuestionPrompts={setQuestionPrompts}
          apiResponse={apiResponse}
          setApiResponse={setApiResponse}
        />
      </div>
    </>
  );
}

export default App;
