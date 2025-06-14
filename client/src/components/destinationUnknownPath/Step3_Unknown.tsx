import temple from "../../assets/images/temple.png";
import { containsBadWords } from "../../utils/containsBadWords";
import BadWordsAlert from "../BadWordsAlert";
import { useAppContext } from "../../contexts/AppContext";
import { useQuestionsResponses } from "../../contexts/QuestionsResponsesContext";

function Step3() {
  const {
    currentStep,
    setCurrentStep,
    userResponses,
    setUserResponses,
    questionPromptsUnknown,
    setQuestionPromptsUnknown,
  } = useQuestionsResponses();
  const {
    apiResponse,
    setApiResponse,
    showBadWordsAlert,
    setShowBadWordsAlert,
  } = useAppContext();

  const setFormValues = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const tempObj = { ...userResponses };
    tempObj[event.target.name as keyof typeof userResponses] =
      event.target.value;
    setUserResponses(tempObj);
  };

  function handleClick() {
    if (containsBadWords(userResponses.response3)) {
      setShowBadWordsAlert(true);
      setTimeout(() => {
        setShowBadWordsAlert(false);
      }, 3000);
    } else {
      setCurrentStep(4);
    }
  }

  return (
    <>
      <div className="stepContainer">
        <div className="questionImageGridContainer">
          <img src={temple} alt="" />
          <h3>{questionPromptsUnknown?.question3}</h3>
          <div></div>
        </div>
        <form className="userForm" action="">
          <textarea
            placeholder="Everything about Maui was amazing...the beaches, the food, the natural scenery."
            rows={3}
            value={userResponses.response3}
            name="response3"
            onChange={setFormValues}
          />
          <div className="buttonContainer">
            <button
              type="button"
              className="back"
              onClick={() => setCurrentStep(2)}
            >
              Go back
            </button>
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

export default Step3;
