import { body, text } from "motion/react-client";
import { Plan } from "../../types/types";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import pyramid from "../../assets/images/pyramids.png";
import { containsBadWords } from "../../utils/containsBadWords";
import BadWordsAlert from "../BadWordsAlert";
import RegisterWithPlan from "../RegisterWithPlan";
import { useAuth } from "../../contexts/AuthContext";
import { useAppContext } from "../../contexts/AppContext";
import { useQuestionsResponses } from "../../contexts/QuestionsResponsesContext";
import FormAlert from "../FormAlert";

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
  const { plan, setPlan, showBadWordsAlert, setShowBadWordsAlert } =
    useAppContext();
  const [showFormAlert, setShowFormAlert] = useState(false);

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
      return;
    }

    if (!hasValidResponses()) {
      setShowFormAlert(true);
      setTimeout(() => {
        setShowFormAlert(false);
      }, 3000);
      return;
    }

    if (!isLoggedIn) {
      openModal();
    } else if (isLoggedIn) {
      navigate("/your-plan");
    }
  }

  const hasValidResponses = () => {
    // Check first name, and then loop through userResponses object to ensure all keys have values (e.g. not "")
    for (let i = 1; i <= 8; i++) {
      if (userResponses[`response${i}` as keyof typeof userResponses] === "")
        return false;
    }
    return true;
  };

  // Handle Enter key to trigger Next step
  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault(); // Prevents new line
      handleClick(); // Calls the same function as the Next step button
    }
  };

  return (
    <>
      <div className="stepContainer">
        <div className="questionImageGridContainer">
          <div></div>
          <h3>{questionPromptsKnown?.question8}</h3>
          <div></div>
        </div>{" "}
        <form className="userForm" action="">
          <textarea
            autoFocus
            placeholder="My daughter is a vegetarian, and loves really good breakfast spots."
            rows={3}
            value={userResponses.response8}
            name="response8"
            onChange={setFormValues}
            onKeyDown={handleKeyDown}
          />
          <div className="buttonContainer">
            <button
              type="button"
              className="back"
              onClick={() => setCurrentStep(7)}
            >
              Go back
            </button>

            <button
              type="button"
              className="next"
              onClick={() => handleClick()}
            >
              Show me the results!
            </button>
          </div>
        </form>
        {showBadWordsAlert && <BadWordsAlert />}
        {showFormAlert && <FormAlert />}
        {isModalOpen && <RegisterWithPlan setIsModalOpen={setIsModalOpen} />}
      </div>
    </>
  );
}

export default Step8;
