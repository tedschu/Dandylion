import { StepProps } from "../types/types";
import carmel from "../assets/images/carmel.webp";

function Step0Home({
  currentStep,
  setCurrentStep,
  userResponses,
  setUserResponses,
  questionPrompts,
  setQuestionPrompts,
}: StepProps) {
  const setFormValues = (event: React.ChangeEvent<HTMLInputElement>) => {
    const tempObj = { ...userResponses };
    tempObj[event.target.name as keyof typeof userResponses] =
      event.target.value;
    setUserResponses(tempObj);
  };

  return (
    <>
      <div className="stepContainer flexCol">
        <div className="questionImageGridContainer">
          <h3>Welcome</h3>
          <div></div>
        </div>

        <div className="buttonContainer flexRow">
          <button className="next" onClick={() => setCurrentStep(1)}>
            Next step
          </button>
        </div>
      </div>
    </>
  );
}

export default Step0Home;
