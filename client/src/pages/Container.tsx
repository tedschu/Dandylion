import Header from "../components/Header";
import Step1 from "../components/Step1";
import Step2 from "../components/Step2";
import Step3 from "../components/Step3";
import Step4 from "../components/Step4";
import Step5 from "../components/Step5";
import Step6 from "../components/Step6";
import Step7 from "../components/Step7";
import Step8 from "../components/Step8";
import Step9Results from "../components/Step9Results";
import { UserResponses, QuestionPrompts } from "../types/types";

type ContainerProps = {
  currentStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  userResponses: UserResponses;
  setUserResponses: React.Dispatch<React.SetStateAction<UserResponses>>;
  questionPrompts: QuestionPrompts;
  setQuestionPrompts: React.Dispatch<React.SetStateAction<QuestionPrompts>>;
};

function Container({
  currentStep,
  setCurrentStep,
  userResponses,
  setUserResponses,
  questionPrompts,
  setQuestionPrompts,
}: ContainerProps) {
  return (
    <>
      <div className="pageContainer flexCol">
        <Header />
        {currentStep === 1 && (
          <Step1
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            userResponses={userResponses}
            setUserResponses={setUserResponses}
            questionPrompts={questionPrompts}
            setQuestionPrompts={setQuestionPrompts}
          />
        )}
        {currentStep === 2 && (
          <Step2
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            userResponses={userResponses}
            setUserResponses={setUserResponses}
            questionPrompts={questionPrompts}
            setQuestionPrompts={setQuestionPrompts}
          />
        )}
        {currentStep === 3 && (
          <Step3
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            userResponses={userResponses}
            setUserResponses={setUserResponses}
            questionPrompts={questionPrompts}
            setQuestionPrompts={setQuestionPrompts}
          />
        )}
        {currentStep === 4 && (
          <Step4
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            userResponses={userResponses}
            setUserResponses={setUserResponses}
            questionPrompts={questionPrompts}
            setQuestionPrompts={setQuestionPrompts}
          />
        )}
        {currentStep === 5 && (
          <Step5
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            userResponses={userResponses}
            setUserResponses={setUserResponses}
            questionPrompts={questionPrompts}
            setQuestionPrompts={setQuestionPrompts}
          />
        )}
        {currentStep === 6 && (
          <Step6
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            userResponses={userResponses}
            setUserResponses={setUserResponses}
            questionPrompts={questionPrompts}
            setQuestionPrompts={setQuestionPrompts}
          />
        )}
        {currentStep === 7 && (
          <Step7
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            userResponses={userResponses}
            setUserResponses={setUserResponses}
            questionPrompts={questionPrompts}
            setQuestionPrompts={setQuestionPrompts}
          />
        )}
        {currentStep === 8 && (
          <Step8
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            userResponses={userResponses}
            setUserResponses={setUserResponses}
            questionPrompts={questionPrompts}
            setQuestionPrompts={setQuestionPrompts}
          />
        )}
        {currentStep === 9 && (
          <Step9Results
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            userResponses={userResponses}
            setUserResponses={setUserResponses}
            questionPrompts={questionPrompts}
            setQuestionPrompts={setQuestionPrompts}
          />
        )}
      </div>
    </>
  );
}

export default Container;
