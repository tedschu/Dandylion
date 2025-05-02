import { StepProps } from "../types/types";
import euro_city from "../assets/images/euro-city.png";

function Step2({
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
          <img src={euro_city} alt="" />
          <h3>{questionPrompts.question2}</h3>
          <div></div>
        </div>
        <form className="userForm flexCol" action="">
          <input
            type="text"
            placeholder="I'm thinking between $3000 - $5000 in total, but I'm flexible."
            value={userResponses.response2}
            name="response2"
            onChange={setFormValues}
          />
          <div className="buttonContainer flexRow">
            <button className="back" onClick={() => setCurrentStep(1)}>
              Go back
            </button>
            <button className="next" onClick={() => setCurrentStep(3)}>
              Next step
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Step2;
