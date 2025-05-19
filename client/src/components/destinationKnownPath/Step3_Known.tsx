import { StepProps } from "../../types/types";
import temple from "../../assets/images/temple.png";

function Step3({
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
          <img src={temple} alt="" />
          <h3>{questionPromptsKnown?.question3}</h3>
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
            <button
              type="button"
              className="next"
              onClick={() => setCurrentStep(4)}
            >
              Next step
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Step3;
