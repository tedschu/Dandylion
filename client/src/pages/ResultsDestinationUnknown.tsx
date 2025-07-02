import { useEffect, useRef, useState } from "react";
import { Plan } from "../types/types";
import destinationImage from "../assets/output.png";
import secondDestinationImage from "../assets/output2.png";
import Header from "../components/Header";
import ResultsLoadingState from "../components/ResultsLoadingState";
import Results_Pre_Unknown from "../components/destinationUnknownPath/results/Results_Pre_Unknown";
import Results_Full_Unknown from "../components/destinationUnknownPath/results/Results_Full_Unknown";
import moon from "../assets/moon.png";
import DandelionSeedsCSS from "../components/DandelionSeedsCSS";
import dandelion_corner_2 from "../assets/dandelion_corner_2.png";
import { text } from "motion/react-client";
import { useAuth } from "../contexts/AuthContext";
import { useQuestionsResponses } from "../contexts/QuestionsResponsesContext";
import { useAppContext } from "../contexts/AppContext";

function ResultsDestinationUnknown() {
  const { userInfo, setUserInfo, isLoggedIn, setIsLoggedIn } = useAuth();
  const {
    currentStep,
    setCurrentStep,
    userResponses,
    setUserResponses,
    questionPromptsUnknown,
  } = useQuestionsResponses();
  const { plan, setPlan, showAPIErrorMessage, setShowAPIErrorMessage } =
    useAppContext();

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

  const storedToken = localStorage.getItem("token");

  // On page load, calls getTripResults() IF all userResponse fields are populated
  useEffect(() => {
    const hasValidResponses = () => {
      // Check first name, and then loop through userResponses object to ensure all keys have values (e.g. not "")
      for (let i = 1; i <= 10; i++) {
        if (userResponses[`response${i}` as keyof typeof userResponses] === "")
          return false;
      }
      return true;
    };

    if (hasValidResponses() === true) {
      getTripResults();
    }
  }, []);

  // Gets trip recommendation for first destination, and then call to server to complete
  // image and second_destination calls (to save load time + ensure calls complete even if user navs away)
  const getTripResults = async () => {
    if (isAnthropicLoading) return;

    setIsAnthropicLoading(true);

    try {
      // Calls Anthropic API, passing questions and user responses (and user's first name)
      // Returns primary and secondary recommendation objects
      // const response = await fetch("/api/anthropicAPI/recommendation", {
      const response = await fetch(
        "/api/anthropicAPI/recommendation-unknown-first",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            question1: questionPromptsUnknown?.question1,
            response1: userResponses.response1,
            question2: questionPromptsUnknown?.question2,
            response2: userResponses.response2,
            question3: questionPromptsUnknown?.question3,
            response3: userResponses.response3,
            question4: questionPromptsUnknown?.question4,
            response4: userResponses.response4,
            question5: questionPromptsUnknown?.question5,
            response5: userResponses.response5,
            question6: questionPromptsUnknown?.question6,
            response6: userResponses.response6,
            question7: questionPromptsUnknown?.question7,
            response7: userResponses.response7,
            question8: questionPromptsUnknown?.question8,
            response8: userResponses.response8,
            question9: questionPromptsUnknown?.question9,
            response9: userResponses.response9,
            question10: questionPromptsUnknown?.question10,
            response10: userResponses.response10,
            firstName: userInfo?.firstName,
          }),
        }
      );

      console.log("Here's the Anthropic response: ", response);

      if (!response.ok) {
        const textResponse = await response.text();
        console.error("server response:", textResponse);

        // Retries the Anthropic API every 3 seconds (for 3 tries) if there's a
        // 529 error, meaning the API is currently overloaded
        if (response.status == 529 || response.status == 500) {
          console.log("Error: Anthropic API is overloaded");
          setTimeout(retryAnthropicAPIOnError, 4000);
          return;
        } else {
          setIsAnthropicLoading(false);
          throw new Error("failed to get the recommendation");
        }
      }

      const textData = await response.json();
      console.log("Here is textData from Antrhopic call:", textData);

      if (textData) {
        try {
          if (textData.destination) {
            setPlan({
              plan_data: textData,
              plan_type: "DESTINATION_UNKNOWN",
              photos_first_destination: [],
              photos_second_destination: [],
            });
            setHasResponse(true);

            const plan = await postPlanAndFormData(textData);

            if (plan) {
              getFirstImage(plan?.planId, plan?.userId, textData);
              console.log(
                "here is what's being passed to getFirstImage: ",
                plan.planId,
                plan.userId,
                textData,
                textData.destination
              );
            }

            // CALL ROUTE TO COMPLETE SERVER-SIDE DESTINATION / IMAGE CALLS (POST)
            fetch("/api/process-remaining-calls", {
              method: "POST",
              keepalive: true,
              headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${storedToken}`,
              },
              body: JSON.stringify({
                planId: plan?.planId,
                userId: plan?.userId,
                userResponses: userResponses,
                questionPromptsUnknown: questionPromptsUnknown,
                firstDestination: textData.destination.location,
                firstName: userInfo?.firstName,
              }),
            });
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
    } catch (error) {
      console.error(error);
    }
  };

  // Calls OpenAI API, passing location and overview info from Anthropic response, userId, planId
  // Returns a postcard-style image for the location
  const getFirstImage = async (
    planId: number,
    userId: number,
    destinationData: any
  ) => {
    try {
      const images = await fetch("/api/gptAPI/image", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          location: destinationData.destination.location,
          overview: destinationData.destination.overview,
          userId: userId,
          planId: planId,
        }),
      });

      console.log("Here is images (raw response):", images);

      const imgData = await images.json();

      console.log("HEre is imgData:", imgData);

      // PUT the image G cloud image URL into the plan object in DB
      if (imgData.success && imgData.imageUrl) {
        const postImage = await fetch("/api/plans/update-first-image", {
          method: "PUT",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${storedToken}`,
          },
          body: JSON.stringify({
            planId: planId,
            imageUrl: imgData.imageUrl,
          }),
        });

        if (!postImage.ok) {
          throw new Error(`HTTP error status: ${postImage.status}`);
        }

        const postImageData = await postImage.json();

        console.log(
          "Here is the data for image 1 from the put route:",
          postImageData
        );

        setPlan((prev) => {
          if (!prev) return prev;
          return {
            ...prev,
            photos_first_destination: [
              ...(prev.photos_first_destination || []),
              imgData.imageUrl,
            ],
          };
        });
      }
    } catch (error) {
      console.error("Error getting the first image:", error);
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

  const postPlanAndFormData = async (textData: Plan) => {
    try {
      const response = await fetch("/api/users/plan", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${storedToken}`,
        },
        body: JSON.stringify({
          plan_data: textData,
          plan_type: "DESTINATION_UNKNOWN",
          form_data: {
            question1: questionPromptsUnknown?.question1,
            response1: userResponses.response1,
            question2: questionPromptsUnknown?.question2,
            response2: userResponses.response2,
            question3: questionPromptsUnknown?.question3,
            response3: userResponses.response3,
            question4: questionPromptsUnknown?.question4,
            response4: userResponses.response4,
            question5: questionPromptsUnknown?.question5,
            response5: userResponses.response5,
            question6: questionPromptsUnknown?.question6,
            response6: userResponses.response6,
            question7: questionPromptsUnknown?.question7,
            response7: userResponses.response7,
            question8: questionPromptsUnknown?.question8,
            response8: userResponses.response8,
            question9: questionPromptsUnknown?.question9,
            response9: userResponses.response9,
            question10: questionPromptsUnknown?.question10,
            response10: userResponses.response10,
            firstName: userInfo?.firstName,
          },
        }),
      });

      const data = await response.json();

      const plan = {
        planId: parseInt(data.plan.id),
        userId: parseInt(data.plan.user_id),
      };

      setPlanId(plan.planId);
      console.log("Here is data:", data);

      return plan;
    } catch (error) {
      console.error("Error posting the plan data:", error);
    }
  };

  return (
    <>
      <div className="resultPageContainer">
        <Header />
        <img className="moon scrollout" src={moon} alt="" />

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
        {hasResponse && plan && !showFullResults && (
          <>
            <Results_Pre_Unknown
              plan={plan}
              setShowFullResults={setShowFullResults}
              hasResponse={hasResponse}
            />
          </>
        )}

        {/* Full (paid) results content */}
        {hasResponse && plan && showFullResults && (
          <>
            <Results_Full_Unknown plan={plan} planID={planId ?? 0} />
          </>
        )}
      </div>
    </>
  );
}

export default ResultsDestinationUnknown;
