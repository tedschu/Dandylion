import { StepProps } from "../../types/types";
import acropolis from "../../assets/images/acropolis.png";

function Step8({
  currentStep,
  setCurrentStep,
  userResponses,
  setUserResponses,
  questionPromptsKnown,
  setQuestionPromptsKnown,
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
          <img src={acropolis} alt="" />
          <h3>{questionPromptsKnown?.question8}</h3>
          <div></div>
        </div>{" "}
        <form className="userForm" action="">
          <textarea
            placeholder="I want to hike across the park all day, every day. So I'll say adventure."
            rows={3}
            value={userResponses.response8}
            name="response8"
            onChange={setFormValues}
          />
          <div className="buttonContainer">
            <button className="back" onClick={() => setCurrentStep(7)}>
              Go back
            </button>
            <button className="next" onClick={() => setCurrentStep(9)}>
              Next step
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Step8;
