import eiffel from "../../assets/images/eiffel.png";
import { containsBadWords } from "../../utils/containsBadWords";
import BadWordsAlert from "../BadWordsAlert";
import { useAppContext } from "../../contexts/AppContext";
import { useQuestionsResponses } from "../../contexts/QuestionsResponsesContext";

function Step5() {
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
    if (containsBadWords(userResponses.response5)) {
      setShowBadWordsAlert(true);
      setTimeout(() => {
        setShowBadWordsAlert(false);
      }, 3000);
    } else {
      setCurrentStep(6);
    }
  }

  return (
    <>
      <div className="stepContainer">
        <div className="questionImageGridContainer">
          <img src={eiffel} alt="" />
          <h3>{questionPromptsUnknown?.question5}</h3>
          <div></div>
        </div>{" "}
        <form className="userForm" action="">
          <textarea
            placeholder="I'd love some warm weather, and I'd like to see the flowers in late Spring."
            rows={3}
            value={userResponses.response5}
            name="response5"
            onChange={setFormValues}
          />
          <div className="buttonContainer">
            <button
              type="button"
              className="back"
              onClick={() => setCurrentStep(4)}
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

export default Step5;
