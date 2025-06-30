import React, { SetStateAction } from "react";

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
  password?: string;
};

export type QuestionPromptsUnknown = {
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

export type QuestionPromptsKnown = {
  question1: string;
  question2: string;
  question3: string;
  question4: string;
  question5: string;
  question6: string;
  question7: string;
  question8: string;
};

export type Attraction = {
  destination_name: string;
  description: string;
};

export type PlaceToStay = {
  name?: string;
  why_recommended?: string;
  price_range?: string;
  location?: string;
  type?: string;
};

export type Restaurants = {
  description: string;
  restaurant_name: string;
  restaurant_type: string;
};

export type Destination = {
  location: string;
  overview: string;
  places_to_stay: PlaceToStay[];
  things_to_do: Attraction[];
  time_to_go: string;
  estimated_cost: string;
  helpful_tips: string;
  itinerary: Itinerary[];
  restaurants: Restaurants[];
};

export type apiResponse = {
  destination: Destination;
  second_destination: Destination;
  destination_photos: string[];
  second_destination_photos: string[];
};

export type Itinerary = {
  day_num: number;
  summary: string;
  morning: string;
  afternoon: string;
  evening: string;
};

export type PlanShareData = {
  planID: number | null;
  destination: string;
};

// For Known data structures:
export type apiResponseKnown = {
  destination: DestinationKnown;
};

export type DestinationKnown = {
  location: string;
  overview: string;
  places_to_stay: PlaceToStay[];
  things_to_do: Attraction[];
  photos: String[];
  time_to_go: string;
  estimated_cost: string;
  helpful_tips: string;
  itinerary: ItineraryKnown[];
  restaurants: Restaurants[];
};

export type ItineraryKnown = {
  day_num: number;
  summary: string;
  morning: ItineraryKnownDays;
  afternoon: ItineraryKnownDays;
  evening: ItineraryKnownDays;
};

export type ItineraryKnownDays = {
  activities: string;
  dining: string;
  time: string;
};
