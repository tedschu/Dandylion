import { StepProps } from "../types/types";

function Step6({
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
        <h3>{questionPrompts.question6}</h3>
        <form className="userForm flexCol" action="">
          <input
            type="text"
            placeholder="I'm thinking between $3000 - $5000 in total, but I'm flexible. Ideally it would be less though."
            value={userResponses.response6}
            name="response6"
            onChange={setFormValues}
          />
          <button onClick={() => setCurrentStep(5)}>Go back</button>
          <button onClick={() => setCurrentStep(7)}>Next step</button>
        </form>
      </div>
    </>
  );
}

export default Step6;
