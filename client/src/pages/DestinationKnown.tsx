import Header from "../components/Header";
import Step1 from "../components/destinationUnknownPath/Step1";
import Step2 from "../components/destinationUnknownPath/Step2";
import Step3 from "../components/destinationUnknownPath/Step3";
import Step4 from "../components/destinationUnknownPath/Step4";
import Step5 from "../components/destinationUnknownPath/Step5";
import Step6 from "../components/destinationUnknownPath/Step6";
import Step7 from "../components/destinationUnknownPath/Step7";
import Step8 from "../components/destinationUnknownPath/Step8";
import Step9 from "../components/destinationUnknownPath/Step9";
import Step10 from "../components/destinationUnknownPath/Step10";
import {
  UserResponses,
  QuestionPrompts,
  apiResponse,
  UserInfo,
} from "../types/types";
import { AnimatePresence, motion } from "motion/react";
import DandelionSeedsCSS from "../components/DandelionSeedsCSS";
import dandelion_corner from "../assets/dandelion_corner.png";
import dandelion_corner_2 from "../assets/dandelion_corner_2.png";

type DestinationKnownProps = {
  currentStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  userResponses: UserResponses;
  setUserResponses: React.Dispatch<React.SetStateAction<UserResponses>>;
  questionPrompts: QuestionPrompts;
  setQuestionPrompts: React.Dispatch<React.SetStateAction<QuestionPrompts>>;
  apiResponse: apiResponse;
  setApiResponse: React.Dispatch<React.SetStateAction<apiResponse>>;
  userInfo: UserInfo;
  setUserInfo: React.Dispatch<React.SetStateAction<UserInfo>>;
};

function DestinationKnown({
  currentStep,
  setCurrentStep,
  userResponses,
  setUserResponses,
  questionPrompts,
  setQuestionPrompts,
  apiResponse,
  setApiResponse,
  userInfo,
  setUserInfo,
}: DestinationKnownProps) {
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

  return (
    <>
      <div className={"pageContainer"} data-question={currentStep}>
        <Header />

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
                      questionPrompts={questionPrompts}
                      setQuestionPrompts={setQuestionPrompts}
                      apiResponse={stepNumber >= 9 ? apiResponse : undefined}
                      setApiResponse={
                        stepNumber >= 9 ? setApiResponse : undefined
                      }
                      userInfo={
                        stepNumber === 0 || stepNumber === 10
                          ? userInfo
                          : undefined
                      }
                      setUserInfo={
                        stepNumber === 0 || stepNumber === 10
                          ? setUserInfo
                          : undefined
                      }
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

export default DestinationKnown;
