import { useEffect, useRef, useState } from "react";
import { StepProps, apiResponse } from "../types/types";
import ResultsLoadingState from "../components/ResultsLoadingState";
import Results_Pre_Known from "../components/destinationKnownPath/results/Results_Pre_Known";
import Results_Full_Known from "../components/destinationKnownPath/results/Results_Full_Known";
import moon from "../assets/moon.png";
import DandelionSeedsCSS from "../components/DandelionSeedsCSS";
import dandelion_corner_2 from "../assets/dandelion_corner_2.png";

function ResultsDestinationKnown({
  currentStep,
  setCurrentStep,
  userResponses,
  setUserResponses,
  apiResponse,
  setApiResponse,
  questionPromptsKnown,
  userInfo,
}: StepProps) {
  // State tracking whether first API call is complete
  const [hasResponse, setHasResponse] = useState(false);
  const [isSecondDestinationOpen, setIsSecondDestinationOpen] = useState(false);

  const [showFullResults, setShowFullResults] = useState(false);
  const [isAnthropicLoading, setIsAnthropicLoading] = useState(false);

  // useRef is appropriate for this since it doesn't require a re-render
  // and is just counting api calls.
  const apiRetriesRef = useRef(0);

  // On page load, calls getTripResults() IF all userResponse fields are populated
  useEffect(() => {
    const hasValidResponses = () => {
      // Check first name, and then loop through userResponses object to ensure all keys have values (e.g. not "")
      for (let i = 1; i <= 8; i++) {
        if (userResponses[`response${i}` as keyof typeof userResponses] === "")
          return false;
      }
      return true;
    };

    if (hasValidResponses() === true) {
      getTripResults();
    }
  }, []);

  // Gets trip recommendation for destination and second_destination, and image for first destination (second is in useEffect below, to save load time)
  const getTripResults = async () => {
    if (isAnthropicLoading) return;
    console.log("Calling Antrhopic API...");

    setIsAnthropicLoading(true);

    try {
      // Calls Anthropic API, passing questions and user responses (and user's first name)
      // Returns primary and secondary recommendation objects
      const response = await fetch("/api/anthropicAPI/recommendation-known", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          question1: questionPromptsKnown?.question1,
          response1: userResponses.response1,
          question2: questionPromptsKnown?.question2,
          response2: userResponses.response2,
          question3: questionPromptsKnown?.question3,
          response3: userResponses.response3,
          question4: questionPromptsKnown?.question4,
          response4: userResponses.response4,
          question5: questionPromptsKnown?.question5,
          response5: userResponses.response5,
          question6: questionPromptsKnown?.question6,
          response6: userResponses.response6,
          question7: questionPromptsKnown?.question7,
          response7: userResponses.response7,
          question8: questionPromptsKnown?.question8,
          response8: userResponses.response8,
          firstName: userInfo?.firstName,
        }),
      });

      console.log("Here's the Anthropic response: ", response);

      if (!response.ok) {
        const textResponse = await response.text();
        console.error("server response:", textResponse);

        // Retries the Anthropic API every 3 seconds (for 3 tries) if there's a
        // 529 error, meaning the API is currently overloaded
        if (response.status == 529) {
          console.log("Error: Anthropic API is overloaded");
          setTimeout(retryAnthropicAPIOnError, 3000);
          return;
        } else {
          setIsAnthropicLoading(false);
          throw new Error("failed to get the recommendation");
        }
      }

      const textData = await response.json();
      console.log("Here is textData from Antrhopic call:", textData);

      // Calls OpenAI API, passing location and overview info from Anthropic response, and user's first name
      // Returns a postcard-style image for the location
      const images = await fetch("/api/gptAPI/image", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          location: textData.destination.location,
          overview: textData.destination.overview,
        }),
      });

      console.log("Here is images (raw response):", images);

      const imgData = await images.json();

      console.log("HEre is imgData:", imgData);

      if (imgData) {
        const copy = { ...textData };
        if (copy.destination && copy.destination.photos) {
          copy.destination.photos.push("eventual_s3_URL");
        }
        if (setApiResponse) {
          setApiResponse(copy as apiResponse);
          setHasResponse(true);
          setIsAnthropicLoading(false);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Calls Anthropic API up to 3 times via getTripResults() if there is a 529 error
  // from Anthropic response.
  const retryAnthropicAPIOnError = () => {
    let maxRetries = 3;

    console.log("Anthropic API error...retrying...");

    if (apiRetriesRef.current < maxRetries) {
      getTripResults();
      apiRetriesRef.current += 1;
    } else {
      setIsAnthropicLoading(false);
    }
  };

  // Calls for second_destination's image once the first image and content has loaded
  useEffect(() => {
    if (hasResponse && apiResponse) {
      getSecondImage();
    }
  }, [hasResponse]);

  // Function to call OpenAI API to get second_Destination image
  const getSecondImage = async () => {
    try {
      console.log("Getting the second image...");
      const images = await fetch("/api/gptAPI/image_second", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          location: apiResponse?.second_destination.location,
          overview: apiResponse?.second_destination.overview,
        }),
      });

      const imgData = await images.json();

      if (imgData) {
        const copy = { ...apiResponse };
        if (copy.second_destination && copy.second_destination.photos) {
          copy.second_destination.photos.push("eventual_s3_URL");
        }
        if (setApiResponse) {
          setApiResponse(copy as apiResponse);
        }
      }
    } catch (error) {}
  };

  return (
    <>
      <div className="resultPageContainer">
        <img
          className="moon"
          src={moon}
          alt=""
          style={{ top: "60px", right: "-40px" }}
        />

        <img src={dandelion_corner_2} className="dandelion_corner" alt="" />
        <DandelionSeedsCSS />
        {/* Loading state component, including progress bar and image carousel */}
        {hasResponse === false && <ResultsLoadingState />}

        {/* Partial (unpaid) results content */}
        {hasResponse && apiResponse && !showFullResults && (
          <>
            <Results_Pre_Known
              apiResponse={apiResponse}
              setIsSecondDestinationOpen={setIsSecondDestinationOpen}
              setShowFullResults={setShowFullResults}
              hasResponse={hasResponse}
            />
          </>
        )}

        {/* Full (paid) results content */}
        {hasResponse && apiResponse && showFullResults && (
          <>
            <Results_Full_Known
              apiResponse={apiResponse}
              setIsSecondDestinationOpen={setIsSecondDestinationOpen}
            />
          </>
        )}
      </div>
    </>
  );
}

export default ResultsDestinationKnown;
