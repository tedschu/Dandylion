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
      <div className="homeContainer flexCol">
        <h1>FIND YOUR PERFECT TRAVEL DESTINATION</h1>
        <p>
          Whether it's halfway around the world, or just a few hours away -
          let's find the perfect spot for you. There's nothing more fun, and
          sometimes more frustrating, than planning a trip. Maybe
        </p>

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
