import { StepProps } from "../types/types";
import lion from "../assets/images/lion.png";

function Step4({
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
          <img src={lion} alt="" />
          <h3>{questionPrompts.question4}</h3>
          <div></div>
        </div>
        <form className="userForm flexCol" action="">
          <input
            type="text"
            placeholder="I'm thinking between $3000 - $5000 in total, but I'm flexible. Ideally it would be less though."
            value={userResponses.response4}
            name="response4"
            onChange={setFormValues}
          />
          <div className="buttonContainer flexRow">
            <button onClick={() => setCurrentStep(3)}>Go back</button>
            <button onClick={() => setCurrentStep(5)}>Next step</button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Step4;
