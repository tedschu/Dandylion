import { StepProps } from "../types/types";
import { useNavigate } from "react-router-dom";

function Home({
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

  const navigate = useNavigate();

  return (
    <>
      <div className="homeContainer">
        <h1 style={{ marginBottom: "2px" }}>
          Travel planning that is{" "}
          <span style={{ fontStyle: "italic" }}>so you</span>
        </h1>
        <p className="textBackground">
          Whether it's halfway around the world, or just a few hours away -
          {/* there's a perfect place for you. Keep all the fun of planning your
          next trip, and get rid of the frustration. TRAVEL simply asks you a
          few questions about who you are and what you're looking to do, and
          then it scours the world to find you a trip that you'll love. In just
          five minutes, get detailed recommendations and itineraries for a trip
          that fits you perfectly. */}
        </p>

        <div className="buttonContainer">
          <div className="formContainer">
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
            <button className="next" onClick={() => navigate("/path")}>
              Get started
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
