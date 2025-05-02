import { useEffect, useState } from "react";
import { StepProps } from "../types/types";
import destinationImage from "../assets/output.png";

function Step11Results({
  currentStep,
  setCurrentStep,
  userResponses,
  setUserResponses,
  questionPrompts,
  setQuestionPrompts,
  apiResponse,
  setApiResponse,
}: StepProps) {
  console.log(apiResponse);

  const [hasResponse, setHasResponse] = useState(false);

  useEffect(() => {
    if (apiResponse && apiResponse.destination) {
      setHasResponse(true);
    }
  }, [apiResponse]);

  return (
    <>
      {hasResponse && (
        <>
          <div className="stepContainer flexCol">
            <h1>{apiResponse?.destination.location}</h1>
            <h2>{apiResponse?.destination.overview}</h2>
            <img src={destinationImage} alt="" className="locationImage" />
            <p>
              <span style={{ fontWeight: "bold" }}>Where to stay:</span>{" "}
              {apiResponse?.destination.places_to_stay}
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
          <div className="stepContainer flexCol">
            <h1>Second destination:</h1>
            <h1>{apiResponse?.second_destination.location}</h1>
            <h2>{apiResponse?.second_destination.overview}</h2>
            <h2>{apiResponse?.second_destination.places_to_stay}</h2>
            {apiResponse?.second_destination.things_to_do.map((destination) => {
              return (
                <>
                  <h2>{destination.destination_name}</h2>
                  <p>{destination.description}</p>
                </>
              );
            })}
            <ul>
              <li>{apiResponse?.destination.time_to_go}</li>
              <li>{apiResponse?.destination.estimated_cost}</li>
              <li>{apiResponse?.destination.helpful_tips}</li>
            </ul>
          </div>
        </>
      )}
    </>
  );
}

export default Step11Results;
