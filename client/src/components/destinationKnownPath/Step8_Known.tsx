import { body, text } from "motion/react-client";
import { apiResponse } from "../../types/types";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import pyramid from "../../assets/images/pyramids.png";
import { containsBadWords } from "../../utils/containsBadWords";
import BadWordsAlert from "../BadWordsAlert";
import RegisterWithPlan from "../RegisterWithPlan";
import { useAuth } from "../../contexts/AuthContext";
import { useAppContext } from "../../contexts/AppContext";
import { useQuestionsResponses } from "../../contexts/QuestionsResponsesContext";

function Step8() {
  const { userInfo, setUserInfo, isLoggedIn, setIsLoggedIn } = useAuth();
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

  const openModal = () => {
    setIsModalOpen(true);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const setFormValues = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const tempObj = { ...userResponses };
    tempObj[event.target.name as keyof typeof userResponses] =
      event.target.value;
    setUserResponses(tempObj);
  };

  const navigate = useNavigate();

  function handleClick() {
    if (containsBadWords(userResponses.response8)) {
      setShowBadWordsAlert(true);
      setTimeout(() => {
        setShowBadWordsAlert(false);
      }, 3000);
    } else if (!isLoggedIn) {
      openModal();
    } else if (isLoggedIn) {
      navigate("/your-plan");
    }
  }

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
            name="response8"
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
            {!showBadWordsAlert && (
              <button
                type="button"
                className="next"
                onClick={() => handleClick()}
              >
                Show me the results!
              </button>
            )}
            {showBadWordsAlert && <BadWordsAlert />}
          </div>
        </form>
        {isModalOpen && <RegisterWithPlan setIsModalOpen={setIsModalOpen} />}
      </div>
    </>
  );
}

export default Step8;
