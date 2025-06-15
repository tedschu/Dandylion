import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import arrow from "../assets/icons/arrow_forward.png";
import bee from "../assets/bee.png";
import { useQuestionsResponses } from "../contexts/QuestionsResponsesContext";

function Path() {
  const { currentStep, setCurrentStep } = useQuestionsResponses();

  const navigate = useNavigate();

  // Uses setCurrentStep(1) to reset in case the user is creating multiple plans (e.g. will end on 10 for the previous)
  const handleKnownDestinationClick = () => {
    setCurrentStep(1);
    navigate("/build-plan");
  };

  const handleUnknownDestinationClick = () => {
    setCurrentStep(1);
    navigate("/find-destination");
  };

  return (
    <>
      <Header />
      <div className="pathContainer">
        <div className="pathContentContainer">
          <h2>How can we help plan your trip?</h2>
          <div className="pathSelectorBox">
            <div
              className="pathSelectorBoxText"
              onClick={() => handleKnownDestinationClick()}
            >
              <h3>I know my destination.</h3>
              <p>I want a plan for while I'm there.</p>
            </div>
            <img src={arrow} alt="" />
          </div>
          <div
            className="pathSelectorBox"
            onClick={() => handleUnknownDestinationClick()}
          >
            <div className="pathSelectorBoxText">
              <h3>I need destination ideas.</h3>
              <p>Help me find new places to explore.</p>
            </div>
            <img src={arrow} alt="" />
          </div>
          <img
            style={{ width: "45px", paddingBottom: "10px" }}
            src={bee}
            alt=""
          />
        </div>
      </div>
    </>
  );
}

export default Path;
