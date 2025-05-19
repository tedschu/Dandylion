import React, { SetStateAction } from "react";

export type StepProps = {
  currentStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  userResponses: UserResponses;
  setUserResponses: React.Dispatch<React.SetStateAction<UserResponses>>;
  questionPromptsUnknown?: QuestionPrompts;
  setQuestionPromptsUnknown?: React.Dispatch<
    React.SetStateAction<QuestionPrompts>
  >;
  questionPromptsKnown?: QuestionPrompts;
  setQuestionPromptsKnown?: React.Dispatch<
    React.SetStateAction<QuestionPrompts>
  >;
  apiResponse?: apiResponse;
  setApiResponse?: React.Dispatch<React.SetStateAction<apiResponse>>;
  userInfo?: UserInfo;
  setUserInfo?: React.Dispatch<React.SetStateAction<UserInfo>>;
};

export type UserResponses = {
  response1: string;
  response2: string;
  response3: string;
  response4: string;
  response5: string;
  response6: string;
  response7: string;
  response8: string;
  response9: string;
  response10: string;
};

export type UserInfo = {
  firstName: string;
  email: string;
};

export type QuestionPrompts = {
  question1: string;
  question2: string;
  question3: string;
  question4: string;
  question5: string;
  question6: string;
  question7: string;
  question8: string;
  question9: string;
  question10: string;
};

export type Attraction = {
  destination_name: string;
  description: string;
};

export type PlaceToStay = {
  place_to_stay: string;
};

export type Destination = {
  location: string;
  overview: string;
  places_to_stay: PlaceToStay[];
  things_to_do: Attraction[];
  photos: String[];
  time_to_go: string;
  estimated_cost: string;
  helpful_tips: string;
};

export type apiResponse = {
  destination: Destination;
  second_destination: Destination;
};
