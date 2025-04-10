import { StepProps } from "../types/types";

function Step9Results({
  currentStep,
  setCurrentStep,
  userResponses,
  setUserResponses,
  questionPrompts,
  setQuestionPrompts,
}: StepProps) {
  console.log(userResponses);

  return <>{userResponses.step1}</>;
}

export default Step9Results;
