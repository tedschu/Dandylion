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
    if (containsBadWords(userResponses.response2)) {
      setShowBadWordsAlert(true);
      setTimeout(() => {
        setShowBadWordsAlert(false);
      }, 3000);
    } else {
      setCurrentStep(3);
    }
  }

  return (
    <>
      <div className="stepContainer">
        <div className="questionImageGridContainer">
          <img src={venetian} alt="" />
          <h3>{questionPromptsKnown?.question2}</h3>
          <div></div>
        </div>
        <form className="userForm" action="">
          <textarea
            placeholder="I'm thinking between $1,500 - $2,000 in total, but I'm flexible. I usually spend the most on good restaurants."
            rows={3}
            value={userResponses.response2}
            name="response2"
            onChange={setFormValues}
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
