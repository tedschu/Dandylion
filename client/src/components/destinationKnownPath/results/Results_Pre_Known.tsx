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
  return (
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
    </>
  );
}

export default Results_Pre_Unknown;
