import { StepProps } from "../../types/types";
import chicago from "../../assets/images/chicago.png";

function Step6({
  currentStep,
  setCurrentStep,
  userResponses,
  setUserResponses,
  questionPromptsUnknown,
  setQuestionPromptsUnknown,
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
          <img src={chicago} alt="" />
          <h3>{questionPromptsUnknown?.question6}</h3>
          <div></div>
        </div>{" "}
        <form className="userForm" action="">
          <textarea
            placeholder="I'm looking to see a bit of everything, but mostly I want to experience what it's like to live there."
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
            <button
              type="button"
              className="next"
              onClick={() => setCurrentStep(7)}
            >
              Next step
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Step6;
