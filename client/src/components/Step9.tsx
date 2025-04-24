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
            placeholder="I'm thinking between $3000 - $5000 in total, but I'm flexible. Ideally it would be less though."
            value={userResponses.response9}
            name="response9"
            onChange={setFormValues}
          />
          <button onClick={() => setCurrentStep(8)}>Go back</button>
          <button onClick={() => setCurrentStep(10)}>Next step</button>
        </form>
      </div>
    </>
  );
}

export default Step9;
