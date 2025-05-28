import destinationImage from "../../../assets/output.png";
import secondDestinationImage from "../../../assets/output2.png";
import { apiResponse } from "../../../types/types";

type ResultsProps = {
  apiResponse: apiResponse;
  setIsSecondDestinationOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

function Results_Full_Unknown({
  apiResponse,
  setIsSecondDestinationOpen,
}: ResultsProps) {
  return (
    <>
      <div className="resultContentContainer">
        <div className="resultsFullContentContainer">
          <h1>{apiResponse?.destination.location}</h1>
          <p className="resultsFullDescription">
            {apiResponse?.destination.overview}
          </p>
          <img src={destinationImage} alt="" className="locationImage" />
          <h2>Where to stay:</h2>

          {apiResponse?.destination.places_to_stay.map((place, index) => {
            return (
              <>
                <li key={index}>
                  <span style={{ fontWeight: "bold" }}>{place.name}</span> in{" "}
                  {place.location}: {place.why_recommended}. {place.price_range}
                  .
                </li>
              </>
            );
          })}

          <h2>Here are some things to do while you're there:</h2>
          {apiResponse?.destination.things_to_do.map((destination, index) => {
            return (
              <>
                <li key={index}>
                  <span style={{ fontWeight: "bold" }}>
                    {destination.destination_name}
                  </span>
                  : {destination.description}
                </li>
              </>
            );
          })}
          <div className="resultsInfoBox">
            <h2>Some important things to plan for:</h2>

            <li>Best time to go: {apiResponse?.destination.time_to_go}</li>
            <li>
              Estimated cost for the trip:{" "}
              {apiResponse?.destination.estimated_cost}
            </li>
            <li>Other tips: {apiResponse?.destination.helpful_tips}</li>
          </div>
          <h2>Here's an itinerary made for you:</h2>
          {apiResponse.destination.itinerary.map((day, index) => {
            return (
              <>
                {/* TODO: NEED TO REVISE THE STRUCTURE OF THE ITINERARY OBJECT, OR FIGURE OUT HOW TO DISPLAY THE DATA IN DAY */}
                <h3
                  style={{
                    alignSelf: "flex-start",
                    margin: "10px 0 5px 0",
                    color: "var(--teal)",
                  }}
                >{`Day ${day.day_num}: ${day.summary}`}</h3>
                <li style={{ paddingLeft: "15px" }} key={index}>
                  {day.plan}
                </li>
              </>
            );
          })}
        </div>
      </div>
      {/* Second destination */}
      <div className="resultContentContainer">
        <h1 onClick={() => setIsSecondDestinationOpen(true)}>
          Click here to also see a second destination:
        </h1>

        <h1>{apiResponse?.second_destination.location}</h1>
        <h2>{apiResponse?.second_destination.overview}</h2>
        <img src={secondDestinationImage} alt="" className="locationImage" />

        <p>
          <span style={{ fontWeight: "bold" }}>Where to stay:</span>{" "}
          {apiResponse?.second_destination.places_to_stay.map(
            (place, index) => {
              return (
                <>
                  <li key={index}>{place.place_to_stay}</li>
                </>
              );
            }
          )}
        </p>
        <h2>Here are some things to do while you're there:</h2>
        {apiResponse?.second_destination.things_to_do.map(
          (destination, index) => {
            return (
              <>
                <li key={index}>
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

        <li>Best time to go: {apiResponse?.second_destination.time_to_go}</li>
        <li>
          Estimated cost for the trip:{" "}
          {apiResponse?.second_destination.estimated_cost}
        </li>
        <li>Other tips: {apiResponse?.second_destination.helpful_tips}</li>
      </div>
    </>
  );
}

export default Results_Full_Unknown;
