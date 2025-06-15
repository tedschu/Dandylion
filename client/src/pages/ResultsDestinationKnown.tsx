import { useEffect, useRef, useState } from "react";
import ResultsLoadingState from "../components/ResultsLoadingState";
import Results_Pre_Known from "../components/destinationKnownPath/results/Results_Pre_Known";
import Results_Full_Known from "../components/destinationKnownPath/results/Results_Full_Known";
import moon from "../assets/moon.png";
import DandelionSeedsCSS from "../components/DandelionSeedsCSS";
import dandelion_corner_2 from "../assets/dandelion_corner_2.png";
import { useAuth } from "../contexts/AuthContext";
import { useQuestionsResponses } from "../contexts/QuestionsResponsesContext";
import { useAppContext } from "../contexts/AppContext";
import { apiResponse } from "../types/types";

function ResultsDestinationKnown() {
  const { userInfo, setUserInfo, isLoggedIn, setIsLoggedIn } = useAuth();
  const {
    currentStep,
    setCurrentStep,
    userResponses,
    setUserResponses,
    questionPromptsKnown,
  } = useQuestionsResponses();
  const {
    apiResponse,
    setApiResponse,
    showAPIErrorMessage,
    setShowAPIErrorMessage,
  } = useAppContext();

  const storedToken = localStorage.getItem("token");

  // State tracking whether first API call is complete
  const [hasResponse, setHasResponse] = useState(false);
  const [isSecondDestinationOpen, setIsSecondDestinationOpen] = useState(false);

  const [showFullResults, setShowFullResults] = useState(false);
  const [isAnthropicLoading, setIsAnthropicLoading] = useState(false);

  // Stores planID from the DB route response, to pass to Results_Full component (enables sharing functionality)
  const [planId, setPlanId] = useState<number>();

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

      // Progressive loading: first updates apiResponse and hasResponse with Anthropic (text) response, and then calls for image in background
      // I'm doing this because waiting for all calls to load could take over a minute
      if (textData) {
        try {
          if (textData.destination) {
            setApiResponse(textData);
            setHasResponse(true);
            postPlanAndFormData(textData);
          } else {
            console.log("Invalid response structure", textData);
            throw new Error("invalid recommendation data structure from API");
          }
        } catch (error) {
          console.error("error processing API response:", error);
          throw new Error("Failing to process recommenadtion data");
        } finally {
          setIsAnthropicLoading(false);
        }
      } else {
        setIsAnthropicLoading(false);
        throw new Error("Empty response from API");
      }

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

      // TODO: Update state with S3 URL once the GPT response comes in *********************

      // if (imgData) {
      //   const copy = { ...textData };
      //   if (copy.destination && copy.destination.photos) {
      //     copy.destination.photos.push("eventual_s3_URL");
      //   }
      //   if (setApiResponse) {
      //     setApiResponse(copy as apiResponse);
      //     setHasResponse(true);
      //     setIsAnthropicLoading(false);
      //   }
      // }
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
      setShowAPIErrorMessage(true);
    }
  };

  const postPlanAndFormData = async (textData: apiResponse) => {
    try {
      const response = await fetch("/api/users/plan", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${storedToken}`,
        },
        body: JSON.stringify({
          result_data: textData,
          plan_type: "DESTINATION_KNOWN",
          form_data: {
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
          },
        }),
      });

      const data = await response.json();

      setPlanId(parseInt(data.plan.id));
      console.log("Here is data:", data);
    } catch (error) {
      console.error("Error posting the plan data:", error);
    }
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
        {hasResponse === false && (
          <ResultsLoadingState
            showAPIErrorMessage={showAPIErrorMessage}
            setShowAPIErrorMessage={setShowAPIErrorMessage}
          />
        )}

        {/* Partial (unpaid) results content */}
        {hasResponse && apiResponse && !showFullResults && (
          <>
            <Results_Pre_Known
              apiResponse={apiResponse}
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
              planID={planId ?? 0}
            />
          </>
        )}
      </div>
    </>
  );
}

export default ResultsDestinationKnown;
