import { hasWarned, motion } from "motion/react";
import beach from "../../assets/images/beach.png";
import { useState } from "react";
import bee from "../../assets/bee.png";
import { containsBadWords } from "../../utils/containsBadWords";
import BadWordsAlert from "../BadWordsAlert";
import { useAppContext } from "../../contexts/AppContext";
import { useQuestionsResponses } from "../../contexts/QuestionsResponsesContext";

function Step1() {
  const {
    currentStep,
    setCurrentStep,
    userResponses,
    setUserResponses,
    questionPromptsUnknown,
    setQuestionPromptsUnknown,
  } = useQuestionsResponses();
  const { plan, setPlan, showBadWordsAlert, setShowBadWordsAlert } =
    useAppContext();

  const setFormValues = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const tempObj = { ...userResponses };
    tempObj[event.target.name as keyof typeof userResponses] =
      event.target.value;
    setUserResponses(tempObj);
  };

  function handleClick() {
    if (containsBadWords(userResponses.response1)) {
      setShowBadWordsAlert(true);
      setTimeout(() => {
        setShowBadWordsAlert(false);
      }, 3000);
    } else {
      setCurrentStep(2);
    }
  }

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
            {!showBadWordsAlert && (
              <button
                type="button"
                className="next"
                onClick={() => handleClick()}
              >
                Next step
              </button>
            )}
            {showBadWordsAlert && <BadWordsAlert />}
          </div>
        </form>
      </div>
    </>
  );
}

export default Step1;
