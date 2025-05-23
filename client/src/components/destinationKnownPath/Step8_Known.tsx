import { body, text } from "motion/react-client";
import { apiResponse, StepProps } from "../../types/types";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import pyramid from "../../assets/images/pyramids.png";

function Step8({
  currentStep,
  setCurrentStep,
  userResponses,
  setUserResponses,
  questionPromptsKnown,
  setQuestionPromptsKnown,
  apiResponse,
  setApiResponse,
  userInfo,
  setUserInfo,
}: StepProps) {
  const setFormValues = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const tempObj = { ...userResponses };
    tempObj[event.target.name as keyof typeof userResponses] =
      event.target.value;
    setUserResponses(tempObj);
  };

  const navigate = useNavigate();

  function handleClick() {
    navigate("/your-plan");
  }

  console.log("Here is the userresponses state on Step8:", userResponses);

  return (
    <>
      <div className="stepContainer">
        <div className="questionImageGridContainer">
          <img src={pyramid} alt="" />
          <h3>{questionPromptsKnown?.question8}</h3>
          <div></div>
        </div>{" "}
        <form className="userForm" action="">
          <textarea
            placeholder="My daughter is a vegetarian, and loves really good breakfast spots."
            rows={3}
            value={userResponses.response8}
            name="response10"
            onChange={setFormValues}
          />
          <div className="buttonContainer">
            <button
              type="button"
              className="back"
              onClick={() => setCurrentStep(7)}
            >
              Go back
            </button>
            <button type="button" className="next" onClick={handleClick}>
              Show me the results!
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Step8;
