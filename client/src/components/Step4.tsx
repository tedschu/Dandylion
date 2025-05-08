import { StepProps } from "../types/types";
import lion from "../assets/images/lion.png";
import { useState, useEffect } from "react";

function Step4({
  currentStep,
  setCurrentStep,
  userResponses,
  setUserResponses,
  questionPrompts,
  setQuestionPrompts,
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
          <h3>{questionPrompts.question4}</h3>
          <div></div>
        </div>
        <form className="userForm" action="">
          <textarea
            placeholder="I've never gone scuba diving yet, but I think that would be a lot of fun."
            rows={3}
            value={userResponses.response4}
            name="response4"
            onChange={setFormValues}
          />
          <div className="buttonContainer">
            <button className="back" onClick={() => setCurrentStep(3)}>
              Go back
            </button>
            <button className="next" onClick={() => setCurrentStep(5)}>
              Next step
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Step4;
