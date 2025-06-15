import { motion } from "motion/react";
import beach from "../../assets/images/beach.png";
import bee from "../../assets/bee.png";
import { useState } from "react";
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
    questionPromptsKnown,
    setQuestionPromptsKnown,
  } = useQuestionsResponses();
  const {
    apiResponse,
    setApiResponse,
    showBadWordsAlert,
    setShowBadWordsAlert,
  } = useAppContext();

  const [showTipBox, setShowTipBox] = useState(true);

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
          <h3>{questionPromptsKnown?.question1}</h3>
          <div></div>
        </div>
        <form className="userForm" action="">
          <textarea
            placeholder="We're flying into San Francisco on June 17, and the plan is to stay there a few nights and then go to Napa for a few nights. We have a wine tour booked on 6/20."
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
