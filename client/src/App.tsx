import { useState } from "react";
import "./index.css";
import Container from "./pages/Container";

function App() {
  const [userResponses, setUserResponses] = useState({
    step1: "",
    step2: "",
    step3: "",
    step4: "",
    step5: "",
    step6: "",
    step7: "",
    step8: "",
  });

  // TODO: ADD A STATE VALUE WITH THE PROMPT QUESTIONS TO MATCH RESPONSES OBJECT
  const [questionPrompts, setQuestionPrompts] = useState({
    step1:
      "Let's get started. Are you traveling solo, with a partner, friends, or family?",
    step2:
      "What's your budget range, and what aspects of travel do you prioritize spending on?",
    step3:
      "What was your favorite vacation experience so far, and what made it special?",
    step4:
      "What's something you've always wanted to do but haven't had the chance to try yet?",
    step5: "What kind of climate or season are you hoping to experience?",
    step6:
      "Are you drawn to natural landscapes, cultural experiences, or urban environments?",
    step7:
      "How do you feel about touristy areas versus off-the-beaten-path experiences?",
    step8: "What's your ideal balance between relaxation and adventure?",
  });

  const [currentStep, setCurrentStep] = useState(1);

  const [apiResponse, setApiResponse] = useState({
    test: "",
  });

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
        />
      </div>
    </>
  );
}

export default App;
