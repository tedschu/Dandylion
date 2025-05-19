import { StepProps } from "../../types/types";
import { motion } from "motion/react";
import beach from "../../assets/images/beach.png";

function Step1({
  currentStep,
  setCurrentStep,
  userResponses,
  setUserResponses,
  questionPromptsUnknown,
  setQuestionPromptsUnknown,
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
          <img src={beach} alt="" />
          <h3>{questionPromptsUnknown?.question1}</h3>
          <div></div>
        </div>
        <form className="userForm" action="">
          <textarea
            placeholder="It'll be me, my husband Jeff, and my two kids, Jack (6) and Nate (9)."
            rows={3}
            value={userResponses.response1}
            name="response1"
            onChange={setFormValues}
          />
          <div className="buttonContainer">
            <button
              type="button"
              className="next"
              onClick={() => setCurrentStep(2)}
            >
              Next step
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Step1;
