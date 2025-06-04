import React, { createContext, useContext, useState, ReactNode } from "react";
import {
  UserResponses,
  QuestionPromptsUnknown,
  QuestionPromptsKnown,
} from "../types/types";

type QuestionsResponsesContextType = {
  userResponses: UserResponses;
  setUserResponses: React.Dispatch<React.SetStateAction<UserResponses>>;
  questionPromptsUnknown: QuestionPromptsUnknown;
  setQuestionPromptsUnknown: React.Dispatch<
    React.SetStateAction<QuestionPromptsUnknown>
  >;
  questionPromptsKnown: QuestionPromptsKnown;
  setQuestionPromptsKnown: React.Dispatch<
    React.SetStateAction<QuestionPromptsKnown>
  >;
  currentStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
};

const QuestionsResponsesContext = createContext<
  QuestionsResponsesContextType | undefined
>(undefined);

type QuestionsResponsesProviderProps = {
  children: ReactNode;
};

export function QuestionsResponsesProvider({
  children,
}: QuestionsResponsesProviderProps) {
  const [userResponses, setUserResponses] = useState({
    response1: "",
    response2: "",
    response3: "",
    response4: "",
    response5: "",
    response6: "",
    response7: "",
    response8: "",
    response9: "",
    response10: "",
  });

  const [questionPromptsUnknown, setQuestionPromptsUnknown] = useState({
    question1:
      "Let's get started. Are you traveling solo, with a partner, friends, or family?",
    question2:
      "What's your budget range, and what aspects of travel do you prioritize spending on?",
    question3:
      "What was your favorite vacation experience so far, and what made it special?",
    question4:
      "What's something you've always wanted to do but haven't had the chance to try yet (or just haven't done in a while)?",
    question5:
      "What climate do you prefer, and are there specific seasonal experiences you're seeking (fall foliage, winter sports, etc.)?",
    question6:
      "Are you drawn to natural landscapes, cultural experiences, urban environments, or a particular combination?",
    question7: "When are you planning to travel and for how long?",
    question8: "What's your ideal balance between relaxation and adventure?",
    question9: "Where are you located? This will help with cost estimates.",
    question10:
      "Are there any accessibility needs, dietary restrictions, or travel limitations I should know about?",
  });

  const [questionPromptsKnown, setQuestionPromptsKnown] = useState({
    question1:
      "What's your trip looking like so far? Tell us about your destination(s), dates, or other big plans.",
    question2:
      "What's your budget range, and what aspects of travel do you prioritize spending on (food, activities, accommodations)?",
    question3: "Are you traveling solo, with a partner, friends, or family?",
    question4:
      "What are you most excited to see or do? This could be specific attractions you've already planned or general interests like food, culture, nightlife, etc.",
    question5:
      "Are you interested in staying mostly in your main destination or exploring surrounding areas and day trips too?",
    question6:
      "What's your preferred pace - packed itineraries and lots of activities, or more leisurely with downtime built in?",
    question7:
      "What are you hoping to get out of this trip personally? For example, relaxation, new perspectives, adventure, cultural immersion, or something else entirely?",
    question8:
      "Last question: Any dietary preferences, restrictions, or food experiences you're particularly excited about?",
  });

  // Used to render step pages based on user's progression
  const [currentStep, setCurrentStep] = useState(1);

  const value = {
    userResponses,
    setUserResponses,
    questionPromptsKnown,
    setQuestionPromptsKnown,
    questionPromptsUnknown,
    setQuestionPromptsUnknown,
    currentStep,
    setCurrentStep,
  };

  return (
    <QuestionsResponsesContext.Provider value={value}>
      {children}
    </QuestionsResponsesContext.Provider>
  );
}

// Custom hook for the auth context
export function useQuestionsResponses() {
  const context = useContext(QuestionsResponsesContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
