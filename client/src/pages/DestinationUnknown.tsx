import Header from "../components/Header";
import Step1 from "../components/destinationUnknownPath/Step1_Unknown";
import Step2 from "../components/destinationUnknownPath/Step2_Unknown";
import Step3 from "../components/destinationUnknownPath/Step3_Unknown";
import Step4 from "../components/destinationUnknownPath/Step4_Unknown";
import Step5 from "../components/destinationUnknownPath/Step5_Unknown";
import Step6 from "../components/destinationUnknownPath/Step6_Unknown";
import Step7 from "../components/destinationUnknownPath/Step7_Unknown";
import Step8 from "../components/destinationUnknownPath/Step8_Unknown";
import Step9 from "../components/destinationUnknownPath/Step9_Unknown";
import Step10 from "../components/destinationUnknownPath/Step10_Unknown";
import {
  UserResponses,
  QuestionPrompts,
  apiResponse,
  UserInfo,
} from "../types/types";
import { AnimatePresence, motion } from "motion/react";
import DandelionSeedsCSS from "../components/DandelionSeedsCSS";
import dandelion_corner_2 from "../assets/dandelion_corner_2.png";
import moon from "../assets/moon.png";

type DestinationUnknownProps = {
  currentStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  userResponses: UserResponses;
  setUserResponses: React.Dispatch<React.SetStateAction<UserResponses>>;
  questionPromptsUnknown: QuestionPrompts;
  setQuestionPromptsUnknown: React.Dispatch<
    React.SetStateAction<QuestionPrompts>
  >;
  apiResponse: apiResponse;
  setApiResponse: React.Dispatch<React.SetStateAction<apiResponse>>;
  userInfo: UserInfo;
  setUserInfo: React.Dispatch<React.SetStateAction<UserInfo>>;
};

function DestinationUnknown({
  currentStep,
  setCurrentStep,
  userResponses,
  setUserResponses,
  questionPromptsUnknown,
  setQuestionPromptsUnknown,
  apiResponse,
  setApiResponse,
  userInfo,
  setUserInfo,
}: DestinationUnknownProps) {
  const steps = [
    Step1,
    Step2,
    Step3,
    Step4,
    Step5,
    Step6,
    Step7,
    Step8,
    Step9,
    Step10,
  ];

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
    1: "10px",
    2: "7px",
    3: "4px",
    4: "0px",
    5: "-4px",
    6: "-8px",
    7: "-12px",
    8: "-17px",
    9: "-22px",
    10: "-27px",
  };

  const moonShift = moonPosition[currentStep as keyof typeof moonPosition];

  return (
    <>
      <div className={"pageContainer"} data-question={currentStep}>
        <Header />
        <img
          className="moon"
          src={moon}
          alt=""
          style={{ top: "60px", right: `${moonShift}` }}
        />

        <img src={dandelion_corner_2} className="dandelion_corner" alt="" />
        <DandelionSeedsCSS />

        {/* Maps through steps array and outputs the component that matches the currentStep state */}
        {steps.map((ComponentStep, index) => {
          const stepNumber = index + 1;
          return (
            stepNumber === currentStep && (
              <>
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
                      currentStep={currentStep}
                      setCurrentStep={setCurrentStep}
                      userResponses={userResponses}
                      setUserResponses={setUserResponses}
                      questionPromptsUnknown={questionPromptsUnknown}
                      setQuestionPromptsUnknown={setQuestionPromptsUnknown}
                      apiResponse={apiResponse}
                      setApiResponse={setApiResponse}
                      userInfo={
                        stepNumber === 0 || stepNumber === 10
                          ? userInfo
                          : undefined
                      }
                      setUserInfo={setUserInfo}
                    />
                  </motion.div>
                </AnimatePresence>
              </>
            )
          );
        })}
      </div>
    </>
  );
}

export default DestinationUnknown;
