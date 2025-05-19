import { StepProps } from "../../types/types";
import surfboards from "../../assets/images/surfboards.png";

function Step9({
  currentStep,
  setCurrentStep,
  userResponses,
  setUserResponses,
  questionPromptsUnknown,
  setQuestionPromptsUnknown,
  apiResponse,
  setApiResponse,
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
          <img src={surfboards} alt="" />
          <h3>{questionPromptsUnknown?.question9}</h3>
          <div></div>
        </div>
        <form className="userForm" action="">
          <textarea
            placeholder="I'm based in San Antonio, Texas."
            rows={3}
            value={userResponses.response9}
            name="response9"
            onChange={setFormValues}
          />
          <div className="buttonContainer">
            <button
              type="button"
              className="back"
              onClick={() => setCurrentStep(8)}
            >
              Go back
            </button>
            <button
              type="button"
              className="next"
              onClick={() => setCurrentStep(10)}
            >
              Next step
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Step9;
