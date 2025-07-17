import venetian from "../../assets/images/venetian.png";
import { containsBadWords } from "../../utils/containsBadWords";
import BadWordsAlert from "../BadWordsAlert";
import { useAppContext } from "../../contexts/AppContext";
import { useQuestionsResponses } from "../../contexts/QuestionsResponsesContext";

function Step2() {
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

  const setFormValues = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const tempObj = { ...userResponses };
    tempObj[event.target.name as keyof typeof userResponses] =
      event.target.value;
    setUserResponses(tempObj);
  };

  function handleClick() {
    if (containsBadWords(userResponses.response2)) {
      setShowBadWordsAlert(true);
      setTimeout(() => {
        setShowBadWordsAlert(false);
      }, 3000);
    } else {
      setCurrentStep(3);
    }
  }

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
          <div></div> <h3>{questionPromptsKnown?.question2}</h3>
          <div></div>
        </div>
        <form className="userForm" action="">
          <textarea
            autoFocus
            placeholder="I'm thinking between $1,500 - $2,000 in total, but I'm flexible. I usually spend the most on good restaurants."
            rows={3}
            value={userResponses.response2}
            name="response2"
            onChange={setFormValues}
            onKeyDown={handleKeyDown}
          />
          <div className="buttonContainer">
            <button
              type="button"
              className="back"
              onClick={() => setCurrentStep(1)}
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

export default Step2;
