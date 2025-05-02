import Header from "../components/Header";
import Step0Home from "../components/Step0Home";
import Step1 from "../components/Step1";
import Step2 from "../components/Step2";
import Step3 from "../components/Step3";
import Step4 from "../components/Step4";
import Step5 from "../components/Step5";
import Step6 from "../components/Step6";
import Step7 from "../components/Step7";
import Step8 from "../components/Step8";
import Step9 from "../components/Step9";
import Step10 from "../components/Step10";
import Step11Results from "../components/Step11Results";
import {
  UserResponses,
  QuestionPrompts,
  apiResponse,
  UserInfo,
} from "../types/types";
import { AnimatePresence, motion } from "motion/react";

type ContainerProps = {
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

function Container({
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
}: ContainerProps) {
  const steps = [
    Step0Home,
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
    Step11Results,
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
      <div className={"pageContainer flexCol"}>
        <Header />

        {/* Maps through steps array and outputs the component that matches the currentStep state */}
        {steps.map((ComponentStep, index) => {
          const stepNumber = index;
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

export default Container;
