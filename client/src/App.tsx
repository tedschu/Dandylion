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

  const [currentStep, setCurrentStep] = useState(0);

  const [apiResponse, setApiResponse] = useState({});

  return (
    <>
      <Container
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
    </>
  );
}

export default App;
