import { StepProps } from "../../types/types";
import redwoods from "../../assets/images/redwoods.png";

function Step7({
  currentStep,
  setCurrentStep,
  userResponses,
  setUserResponses,
  questionPromptsKnown,
  setQuestionPromptsKnown,
}: StepProps) {
  const setFormValues = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const tempObj = { ...userResponses };
    tempObj[event.target.name as keyof typeof userResponses] =
      event.target.value;
    setUserResponses(tempObj);
  };

  return (
    <>
      <div className="stepContainer">
        <div className="questionImageGridContainer">
          <img src={redwoods} alt="" />
          <h3>{questionPromptsKnown?.question7}</h3>
          <div></div>
        </div>{" "}
        <form className="userForm" action="">
          <textarea
            placeholder="Ideally late summer or early fall, and I'd like to go for maybe 6-8 days."
            rows={3}
            value={userResponses.response7}
            name="response7"
            onChange={setFormValues}
          />
          <div className="buttonContainer">
            <button
              type="button"
              className="back"
              onClick={() => setCurrentStep(6)}
            >
              Go back
            </button>
            <button
              type="button"
              className="next"
              onClick={() => setCurrentStep(8)}
            >
              Next step
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Step7;
