import chicago from "../../assets/images/chicago.png";
import { containsBadWords } from "../../utils/containsBadWords";
import BadWordsAlert from "../BadWordsAlert";
import { useAppContext } from "../../contexts/AppContext";
import { useQuestionsResponses } from "../../contexts/QuestionsResponsesContext";

function Step6() {
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

  const setFormValues = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const tempObj = { ...userResponses };
    tempObj[event.target.name as keyof typeof userResponses] =
      event.target.value;
    setUserResponses(tempObj);
  };

  function handleClick() {
    if (containsBadWords(userResponses.response6)) {
      setShowBadWordsAlert(true);
      setTimeout(() => {
        setShowBadWordsAlert(false);
      }, 3000);
    } else {
      setCurrentStep(7);
    }
  }

  return (
    <>
      <div className="stepContainer">
        <div className="questionImageGridContainer">
          <img src={chicago} alt="" />
          <h3>{questionPromptsKnown?.question6}</h3>
          <div></div>
        </div>{" "}
        <form className="userForm" action="">
          <textarea
            placeholder="I want at least one planned activity every day, but the rest to be more flexible."
            rows={3}
            value={userResponses.response6}
            name="response6"
            onChange={setFormValues}
          />
          <div className="buttonContainer">
            <button
              type="button"
              className="back"
              onClick={() => setCurrentStep(5)}
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

export default Step6;
