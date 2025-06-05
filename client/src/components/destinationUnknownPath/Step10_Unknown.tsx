import { body, text } from "motion/react-client";
import { apiResponse, StepProps } from "../../types/types";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import pyramid from "../../assets/images/pyramids.png";
import { containsBadWords } from "../../utils/containsBadWords";
import BadWordsAlert from "../BadWordsAlert";
import Register from "../Register";
import { useAuth } from "../../contexts/AuthContext";

function Step10({
  currentStep,
  setCurrentStep,
  userResponses,
  setUserResponses,
  questionPromptsUnknown,
  setQuestionPromptsUnknown,
  apiResponse,
  setApiResponse,
  showBadWordsAlert,
  setShowBadWordsAlert,
}: StepProps) {
  const { userInfo, setUserInfo, isLoggedIn, setIsLoggedIn } = useAuth();

  const setFormValues = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const tempObj = { ...userResponses };
    tempObj[event.target.name as keyof typeof userResponses] =
      event.target.value;
    setUserResponses(tempObj);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();

  const openModal = () => {
    setIsModalOpen(true);
  };

  // On "see results" button, first checks for "bad words" and alerts if found
  // Then, if user is logged in, goes to destination plan
  // If not logged in, opens register / login modal
  function handleClick() {
    if (containsBadWords(userResponses.response10 ?? "")) {
      setShowBadWordsAlert(true);
      setTimeout(() => {
        setShowBadWordsAlert(false);
      }, 3000);
    } else if (!isLoggedIn) {
      openModal();
    } else if (isLoggedIn) {
      navigate("/your-destination-plan");
    }
  }

  console.log("Here is the userresponses state on Step10:", userResponses);

  return (
    <>
      <div className="stepContainer">
        <div className="questionImageGridContainer">
          <img src={pyramid} alt="" />
          <h3>{questionPromptsUnknown?.question10}</h3>
          <div></div>
        </div>{" "}
        <form className="userForm" action="">
          <textarea
            placeholder="My daughter is a vegetarian."
            rows={3}
            value={userResponses.response10}
            name="response10"
            onChange={setFormValues}
          />
          <div className="buttonContainer">
            <button
              type="button"
              className="back"
              onClick={() => setCurrentStep(9)}
            >
              Go back
            </button>
            {!showBadWordsAlert && (
              <button
                type="button"
                className="next"
                onClick={() => handleClick()}
              >
                See my travel plan
              </button>
            )}
            {showBadWordsAlert && <BadWordsAlert />}
          </div>
        </form>
        {isModalOpen && (
          <Register
            setIsModalOpen={setIsModalOpen}
            userInfo={userInfo}
            setUserInfo={setUserInfo}
            isLoggedIn={isLoggedIn}
            setIsLoggedIn={setIsLoggedIn}
          />
        )}
      </div>
    </>
  );
}

export default Step10;
