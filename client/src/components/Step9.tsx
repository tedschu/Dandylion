import { StepProps } from "../types/types";

function Step9({
  currentStep,
  setCurrentStep,
  userResponses,
  setUserResponses,
  questionPrompts,
  setQuestionPrompts,
  apiResponse,
  setApiResponse,
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
        <h3>{questionPrompts.question9}</h3>
        <form className="userForm flexCol" action="">
          <input
            type="text"
            placeholder="I'm based in San Antonio, Texas."
            value={userResponses.response9}
            name="response9"
            onChange={setFormValues}
          />
          <div className="buttonContainer flexRow">
            <button className="back" onClick={() => setCurrentStep(8)}>
              Go back
            </button>
            <button className="next" onClick={() => setCurrentStep(10)}>
              Next step
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Step9;
