import { StepProps } from "../types/types";

function Step10({
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

  function handleSubmission() {
    getTripResults();
    setCurrentStep(11);
  }

  const getTripResults = async () => {
    try {
      const response = await fetch("/api/anthropicAPI/recommendation", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          question1: questionPrompts.question1,
          response1: userResponses.response1,
          question2: questionPrompts.question2,
          response2: userResponses.response2,
          question3: questionPrompts.question3,
          response3: userResponses.response3,
          question4: questionPrompts.question4,
          response4: userResponses.response4,
          question5: questionPrompts.question5,
          response5: userResponses.response5,
          question6: questionPrompts.question6,
          response6: userResponses.response6,
          question7: questionPrompts.question7,
          response7: userResponses.response7,
          question8: questionPrompts.question8,
          response8: userResponses.response8,
          question9: questionPrompts.question9,
          response9: userResponses.response9,
          question10: questionPrompts.question10,
          response10: userResponses.response10,
        }),
      });

      if (!response.ok) {
        const textResponse = await response.text();
        console.error("server response:", textResponse);
        throw new Error("failed to get the recommendation");
      }

      const data = await response.json();

      if (setApiResponse) {
        setApiResponse(data);
      }
    } catch (error) {}
  };

  return (
    <>
      <div className="stepContainer flexCol">
        <h3>{questionPrompts.question10}</h3>
        <form className="userForm flexCol" action="">
          <input
            type="text"
            placeholder="Note any travel limitations."
            value={userResponses.response10}
            name="response10"
            onChange={setFormValues}
          />
          <div className="buttonContainer flexRow">
            <button onClick={() => setCurrentStep(9)}>Go back</button>
            <button onClick={handleSubmission}>Show me the results!</button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Step10;
