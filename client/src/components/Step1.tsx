import { StepProps } from "../types/types";
import { motion } from "motion/react";
import beach from "../assets/images/beach.png";

function Step1({
  currentStep,
  setCurrentStep,
  userResponses,
  setUserResponses,
  questionPrompts,
  setQuestionPrompts,
}: StepProps) {
  const setFormValues = (event: React.ChangeEvent<HTMLInputElement>) => {
    const tempObj = { ...userResponses };
    tempObj[event.target.name as keyof typeof userResponses] =
      event.target.value;
    setUserResponses(tempObj);
  };

  // TODO: MAKE RESIZABLE INPUT BOX

  return (
    <>
      <div className="stepContainer flexCol">
        <div className="questionImageGridContainer">
          <img src={beach} alt="" />
          <h3>{questionPrompts.question1}</h3>
          <div></div>
        </div>
        <form className="userForm flexCol" action="">
          <input
            className="userInputBox"
            type="text"
            placeholder="Be conversational: ex. 'I'm going with my daughter and her two friends.'"
            value={userResponses.response1}
            name="response1"
            onChange={setFormValues}
          />
          <div className="buttonContainer flexRow">
            <button className="next" onClick={() => setCurrentStep(2)}>
              Next step
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Step1;
