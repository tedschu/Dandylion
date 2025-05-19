import { StepProps } from "../../types/types";
import venetian from "../../assets/images/venetian.png";

function Step2({
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
          <img src={venetian} alt="" />
          <h3>{questionPromptsKnown?.question2}</h3>
          <div></div>
        </div>
        <form className="userForm" action="">
          <textarea
            placeholder="I'm thinking between $3000 - $5000 in total, but I'm flexible."
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
            <button
              type="button"
              className="next"
              onClick={() => setCurrentStep(3)}
            >
              Next step
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Step2;
