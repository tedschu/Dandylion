import { StepProps } from "../../types/types";
import lion from "../../assets/images/lion.png";
import { useState, useEffect } from "react";

function Step4({
  currentStep,
  setCurrentStep,
  userResponses,
  setUserResponses,
  questionPromptsKnown,
  setQuestionPromptsKnown,
}: StepProps) {
  const setFormValues = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const tempObj = { ...userResponses };
    tempObj[event.target.name as keyof typeof userResponses] =
      event.target.value;
    setUserResponses(tempObj);
  };

  return (
    <>
      <div className="stepContainer">
        <div className="questionImageGridContainer">
          <img src={lion} alt="" />
          <h3>{questionPromptsKnown?.question4}</h3>
          <div></div>
        </div>
        <form className="userForm" action="">
          <textarea
            placeholder="I'm really excited about the Highline Trail - that's a must-see. I'd love to find other great hiking spots in the park."
            rows={3}
            value={userResponses.response4}
            name="response4"
            onChange={setFormValues}
          />
          <div className="buttonContainer">
            <button
              type="button"
              className="back"
              onClick={() => setCurrentStep(3)}
            >
              Go back
            </button>
            <button
              type="button"
              className="next"
              onClick={() => setCurrentStep(5)}
            >
              Next step
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Step4;
