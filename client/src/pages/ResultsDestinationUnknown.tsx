import { useEffect, useState } from "react";
import { StepProps, apiResponse } from "../types/types";
import destinationImage from "../assets/output.png";
import secondDestinationImage from "../assets/output2.png";
import Header from "../components/Header";
import "@material/web/progress/circular-progress.js";
import { MdCircularProgress } from "@material/web/progress/circular-progress.js";
import ResultsLoadingState from "../components/ResultsLoadingState";

function ResultsDestinationUnknown({
  currentStep,
  setCurrentStep,
  userResponses,
  setUserResponses,
  apiResponse,
  setApiResponse,
  questionPromptsUnknown,
  userInfo,
}: StepProps) {
  // State tracking whether first API call is complete
  const [hasResponse, setHasResponse] = useState(false);
  const [isSecondDestinationOpen, setIsSecondDestinationOpen] = useState(false);
  const [apiRetries, setApiRetries] = useState(0);

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

    console.log("Here's hasValidResponses result:", hasValidResponses());

    if (hasValidResponses() === true) {
      getTripResults();
    }
  }, []);

  console.log("here is response1:", userResponses["response1"]);

  // Gets trip recommendation for destination and second_destination, and image for first destination (second is in useEffect below, to save load time)
  const getTripResults = async () => {
    try {
      // Calls Anthropic API, passing questions and user responses (and user's first name)
      // Returns primary and secondary recommendation objects
      const response = await fetch("/api/anthropicAPI/recommendation", {
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
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (hasResponse && apiResponse) {
      getSecondImage();
    }
  }, [hasResponse]);

  // Calls Anthropic API up to 3 times via getTripResults() if there is a 529 error
  // from Anthropic response.
  const retryAnthropicAPIOnError = () => {
    let maxRetries = 3;

    console.log("Anthropic API error...retrying...");

    if (apiRetries < maxRetries) {
      getTripResults();
      setApiRetries((prev) => prev + 1);
    }
  };

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
  console.log(apiResponse);

  return (
    <>
      <div className="resultPageContainer">
        <Header />
        {/* Loading state component, including progress bar and image carousel */}
        {hasResponse === false && <ResultsLoadingState />}

        {/* Results content */}
        {hasResponse && (
          <>
            <div className="resultContentContainer">
              <h1>{apiResponse?.destination.location}</h1>
              <h2>{apiResponse?.destination.overview}</h2>
              <img src={destinationImage} alt="" className="locationImage" />
              <p>
                <span style={{ fontWeight: "bold" }}>Where to stay:</span>{" "}
                {apiResponse?.destination.places_to_stay.map((place) => {
                  return (
                    <>
                      <li>{place.place_to_stay}</li>
                    </>
                  );
                })}
              </p>
              <h2>Here are some things to do while you're there:</h2>
              {apiResponse?.destination.things_to_do.map((destination) => {
                return (
                  <>
                    <li>
                      <span style={{ fontWeight: "bold" }}>
                        {destination.destination_name}
                      </span>
                      : {destination.description}
                    </li>
                  </>
                );
              })}
              <h2>Some important things to plan for:</h2>

              <li>Best time to go: {apiResponse?.destination.time_to_go}</li>
              <li>
                Estimated cost for the trip:{" "}
                {apiResponse?.destination.estimated_cost}
              </li>
              <li>Other tips: {apiResponse?.destination.helpful_tips}</li>
            </div>
            {/* Second destination */}
            <div className="resultContentContainer">
              <h1 onClick={() => setIsSecondDestinationOpen(true)}>
                Click here to also see a second destination:
              </h1>

              <h1>{apiResponse?.second_destination.location}</h1>
              <h2>{apiResponse?.second_destination.overview}</h2>
              <img
                src={secondDestinationImage}
                alt=""
                className="locationImage"
              />

              <p>
                <span style={{ fontWeight: "bold" }}>Where to stay:</span>{" "}
                {apiResponse?.second_destination.places_to_stay.map((place) => {
                  return (
                    <>
                      <li>{place.place_to_stay}</li>
                    </>
                  );
                })}
              </p>
              <h2>Here are some things to do while you're there:</h2>
              {apiResponse?.second_destination.things_to_do.map(
                (destination) => {
                  return (
                    <>
                      <li>
                        <span style={{ fontWeight: "bold" }}>
                          {destination.destination_name}
                        </span>
                        : {destination.description}
                      </li>
                    </>
                  );
                }
              )}
              <h2>Some important things to plan for:</h2>

              <li>
                Best time to go: {apiResponse?.second_destination.time_to_go}
              </li>
              <li>
                Estimated cost for the trip:{" "}
                {apiResponse?.second_destination.estimated_cost}
              </li>
              <li>
                Other tips: {apiResponse?.second_destination.helpful_tips}
              </li>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default ResultsDestinationUnknown;
