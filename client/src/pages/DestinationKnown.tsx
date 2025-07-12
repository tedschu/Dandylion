import Header from "../components/Header";
import Step1 from "../components/destinationKnownPath/Step1_Known";
import Step2 from "../components/destinationKnownPath/Step2_Known";
import Step3 from "../components/destinationKnownPath/Step3_Known";
import Step4 from "../components/destinationKnownPath/Step4_Known";
import Step5 from "../components/destinationKnownPath/Step5_Known";
import Step6 from "../components/destinationKnownPath/Step6_Known";
import Step7 from "../components/destinationKnownPath/Step7_Known";
import Step8 from "../components/destinationKnownPath/Step8_Known";

import { AnimatePresence, motion } from "motion/react";
import DandelionSeedsCSS from "../components/DandelionSeedsCSS";
import dandelion_corner_2 from "../assets/dandelion_corner_2.png";
import moon from "../assets/moon.png";
import { useAuth } from "../contexts/AuthContext";
import { useQuestionsResponses } from "../contexts/QuestionsResponsesContext";
import { useAppContext } from "../contexts/AppContext";

function DestinationKnown() {
  const {
    currentStep,
    // setCurrentStep,
    // userResponses,
    // setUserResponses,
    // questionPromptsKnown,
    // setQuestionPromptsKnown,
  } = useQuestionsResponses();

  // const { userInfo, setUserInfo, isLoggedIn, setIsLoggedIn } = useAuth();
  // const {
  //   apiResponse,
  //   setApiResponse,
  //   showBadWordsAlert,
  //   setShowBadWordsAlert,
  // } = useAppContext();

  const steps = [Step1, Step2, Step3, Step4, Step5, Step6, Step7, Step8];

  const motionProps = {
    initial: { opacity: 0.2, y: -100 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0.2, y: 100 },
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 30,
    },
  };

  const moonPosition = {
    1: "80px",
    2: "65px",
    3: "50px",
    4: "35px",
    5: "20px",
    6: "5px",
    7: "-10px",
    8: "-25px",
  };

  const moonShift = moonPosition[currentStep as keyof typeof moonPosition];

  return (
    <>
      <div className={"pageContainer"} data-question={currentStep}>
        <Header variant="header-fixed" />
        {/* <img
          className="moon"
          src={moon}
          alt=""
          style={{ top: "60px", right: `${moonShift}` }}
        /> */}

        <img src={dandelion_corner_2} className="dandelion_corner" alt="" />
        <DandelionSeedsCSS />

        {/* Maps through steps array and outputs the component that matches the currentStep state */}
        {steps.map((ComponentStep, index) => {
          const stepNumber = index + 1;
          return (
            stepNumber === currentStep && (
              <AnimatePresence mode="wait">
                <motion.div
                  key={stepNumber}
                  {...motionProps}
                  style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <ComponentStep
                    key={stepNumber}
                    // currentStep={currentStep}
                    // setCurrentStep={setCurrentStep}
                    // userResponses={userResponses}
                    // setUserResponses={setUserResponses}
                    // questionPromptsKnown={questionPromptsKnown}
                    // setQuestionPromptsKnown={setQuestionPromptsKnown}
                    // apiResponse={apiResponse}
                    // setApiResponse={setApiResponse}
                    // userInfo={
                    //   stepNumber === 0 || stepNumber === 8
                    //     ? userInfo
                    //     : undefined
                    // }
                    // setUserInfo={setUserInfo}
                    // showBadWordsAlert={showBadWordsAlert}
                    // setShowBadWordsAlert={setShowBadWordsAlert}
                  />
                </motion.div>
              </AnimatePresence>
            )
          );
        })}
      </div>
    </>
  );
}

export default DestinationKnown;
