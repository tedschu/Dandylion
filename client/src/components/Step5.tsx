import { StepProps } from "../types/types";
import eiffel from "../assets/images/eiffel.png";

function Step5({
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
          <img src={eiffel} alt="" />
          <h3>{questionPrompts.question5}</h3>
          <div></div>
        </div>{" "}
        <form className="userForm flexCol" action="">
          <input
            type="text"
            placeholder="I'd love some warm weather, and I'd like to see the flowers in late Spring."
            value={userResponses.response5}
            name="response5"
            onChange={setFormValues}
          />
          <div className="buttonContainer flexRow">
            <button className="back" onClick={() => setCurrentStep(4)}>
              Go back
            </button>
            <button className="next" onClick={() => setCurrentStep(6)}>
              Next step
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Step5;
