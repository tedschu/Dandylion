import destinationImage from "../../../assets/output.png";
import secondDestinationImage from "../../../assets/output2.png";
import { apiResponse } from "../../../types/types";

type ResultsProps = {
  apiResponse: apiResponse;
  setIsSecondDestinationOpen: React.Dispatch<React.SetStateAction<boolean>>;
  hasResponse: boolean;
  setShowFullResults: React.Dispatch<React.SetStateAction<boolean>>;
};

function Results_Pre_Unknown({
  apiResponse,
  setIsSecondDestinationOpen,
  hasResponse,
  setShowFullResults,
}: ResultsProps) {
  const tempFullResults = () => {
    setShowFullResults(true);
  };

  console.log(apiResponse);
  return (
    <>
      <div className="resultContentContainer">
        <div className="resultPreviewText">
          <h1>{apiResponse?.destination.location}</h1>
          <p style={{ fontWeight: "bold" }}>
            {apiResponse?.destination.overview}
          </p>
          {/* Removed image load for pre results to reduce time-to-load */}
          {/* <img src={destinationImage} alt="" className="locationImage" /> */}

          <h2>
            Here are a few things we'd recommend for you while you're there:
          </h2>
          <li>
            <span style={{ fontWeight: "bold" }}>
              {apiResponse?.destination.things_to_do[0].destination_name}
            </span>
            : {apiResponse.destination.things_to_do[0].description}
          </li>
          <li>
            <span style={{ fontWeight: "bold" }}>
              {apiResponse?.destination.things_to_do[1].destination_name}
            </span>
            : {apiResponse.destination.things_to_do[1].description}
          </li>

          <h2>Here's a place to stay that may be good for you:</h2>
          <li>
            <span style={{ fontWeight: "bold" }}>
              {apiResponse.destination.places_to_stay[0].name}
            </span>{" "}
            in {apiResponse.destination.places_to_stay[0].location}:{" "}
            {apiResponse.destination.places_to_stay[0].why_recommended}
          </li>

          <h2>Here's a restaurant you might enjoy:</h2>
          <li>
            <span style={{ fontWeight: "bold" }}>
              {apiResponse.destination.restaurants[0].restaurant_name}:{" "}
            </span>
            {apiResponse.destination.restaurants[0].description}
          </li>
        </div>

        <div className="resultsUpgradeContentContainer">
          <h2>Dandylion has so much more waiting for you:</h2>
          <li style={{ fontWeight: "bold" }}>
            Get your full, customized itinerary for this{" "}
            <span style={{ textDecoration: "underline" }}>
              and a second destination!
            </span>
          </li>
          <li>See more trip highlights, activities and places to stay</li>
          <li>Get details on the best times to go</li>
          <li>Find helpful travel tips and customs for this destination</li>
          <li>
            Further customize, save and share your itinerary based on your
            preferences
          </li>
          <h3>Get all of this and more for $7!</h3>

          {/*  TEMPORARY BUTTON TO TOGGLE BETWEEN INITIAL (UNPAID) AND FULL (PAID) RESULTS */}
          {hasResponse && (
            <button
              style={{
                backgroundColor: "var(--action-coral",
                color: "white",
                margin: "10px 0px",
              }}
              onClick={() => tempFullResults()}
            >
              Show full (paid) results
            </button>
          )}
        </div>
      </div>
    </>
  );
}

export default Results_Pre_Unknown;
