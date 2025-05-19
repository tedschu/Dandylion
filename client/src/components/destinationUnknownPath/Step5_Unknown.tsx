import { StepProps } from "../../types/types";
import eiffel from "../../assets/images/eiffel.png";

function Step5({
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
            <button
              type="button"
              className="next"
              onClick={() => setCurrentStep(6)}
            >
              Next step
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Step5;
