import { StepProps } from "../types/types";

function Step7({
  currentStep,
  setCurrentStep,
  userResponses,
  setUserResponses,
  questionPrompts,
  setQuestionPrompts,
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
        <h3>{questionPrompts.question7}</h3>
        <form className="userForm" action="">
          <textarea
            placeholder="Ideally late summer or early fall, and I'd like to go for maybe 6-8 days."
            rows={3}
            value={userResponses.response7}
            name="response7"
            onChange={setFormValues}
          />
          <div className="buttonContainer">
            <button className="back" onClick={() => setCurrentStep(6)}>
              Go back
            </button>
            <button className="next" onClick={() => setCurrentStep(8)}>
              Next step
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Step7;
