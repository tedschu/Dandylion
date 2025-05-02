import { StepProps } from "../types/types";

function Step0Home({
  currentStep,
  setCurrentStep,
  userResponses,
  setUserResponses,
  questionPrompts,
  setQuestionPrompts,
  userInfo,
  setUserInfo,
}: StepProps) {
  const setFormValues = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setUserInfo?.((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <>
      <div className="homeContainer flexCol">
        <h1 style={{ marginBottom: "2px" }}>
          TRAVEL PLANNING THAT IS{" "}
          <span style={{ fontStyle: "italic" }}>SO YOU</span>
        </h1>
        <p className="textBackground">
          Whether it's halfway around the world, or just a few hours away -
          there's a perfect place for you. Keep all the fun of planning your
          next trip, and get rid of the frustration. TRAVEL simply asks you a
          few questions about who you are and what you're looking to do, and
          then it scours the world to find you a trip that you'll love. In just
          five minutes, get detailed recommendations and itineraries for a trip
          that fits you perfectly.
        </p>

        <div className="buttonContainer flexCol">
          <div className="formContainer flexRow">
            <input
              type="text"
              placeholder="First name"
              value={userInfo?.firstName}
              name="firstName"
              onChange={setFormValues}
            />
            <input
              type="text"
              placeholder="email"
              value={userInfo?.email}
              name="email"
              onChange={setFormValues}
            />
            <button className="next" onClick={() => setCurrentStep(1)}>
              Get started
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Step0Home;
