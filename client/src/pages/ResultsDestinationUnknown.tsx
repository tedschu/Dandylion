import { useEffect, useState } from "react";
import { StepProps, apiResponse } from "../types/types";
import destinationImage from "../assets/output.png";
import secondDestinationImage from "../assets/output2.png";

function ResultsDestinationUnknown({
  currentStep,
  setCurrentStep,
  userResponses,
  setUserResponses,
  apiResponse,
  setApiResponse,
}: StepProps) {
  console.log(apiResponse);

  const [hasResponse, setHasResponse] = useState(false);
  const [isSecondDestinationOpen, setIsSecondDestinationOpen] = useState(false);

  useEffect(() => {
    if (apiResponse && apiResponse.destination) {
      setHasResponse(true);
    }

    if (
      apiResponse?.second_destination?.photos?.length === 0 &&
      apiResponse?.destination?.photos?.length > 0
    ) {
      getSecondImage();
    }
  }, [apiResponse]);

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
      {hasResponse && (
        <>
          <div className="resultContainer">
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
          {/* Second destination */}
          <div className="resultContainer">
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

export default ResultsDestinationUnknown;
