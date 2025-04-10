import React, { SetStateAction } from "react";

export type StepProps = {
  currentStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  userResponses: UserResponses;
  setUserResponses: React.Dispatch<React.SetStateAction<UserResponses>>;
  questionPrompts: QuestionPrompts;
  setQuestionPrompts: React.Dispatch<React.SetStateAction<QuestionPrompts>>;
};

export type UserResponses = {
  step1: string;
  step2: string;
  step3: string;
  step4: string;
  step5: string;
  step6: string;
  step7: string;
  step8: string;
};

export type QuestionPrompts = {
  step1: string;
  step2: string;
  step3: string;
  step4: string;
  step5: string;
  step6: string;
  step7: string;
  step8: string;
};
