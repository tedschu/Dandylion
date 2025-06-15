import destinationImage from "../../../assets/output.png";
import secondDestinationImage from "../../../assets/output2.png";
import { apiResponse } from "../../../types/types";

type ResultsProps = {
  apiResponse: apiResponse;
  planID: number;
};

function Results_Full_Known({ apiResponse }: ResultsProps) {
  return (
    <>
      <div className="resultContentContainer">
        <h1>{apiResponse?.destination.location}</h1>
        <h2>{apiResponse?.destination.overview}</h2>
        <img src={destinationImage} alt="" className="locationImage" />
        <p>
          <span style={{ fontWeight: "bold" }}>Where to stay:</span>{" "}
          {apiResponse?.destination.places_to_stay.map((place, index) => {
            return (
              <>
                <li key={`${place.name} - ${index}`}>
                  {place.name}: {place.why_recommended}. Cost is{" "}
                  {place.price_range}
                </li>
              </>
            );
          })}
        </p>
        <h2>Here are some things to do while you're there:</h2>
        {apiResponse?.destination.things_to_do.map((destination, index) => {
          return (
            <>
              <li key={`${destination.destination_name} - ${index}`}>
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
          Estimated cost for the trip: {apiResponse?.destination.estimated_cost}
        </li>
        <li>Other tips: {apiResponse?.destination.helpful_tips}</li>
        <h2>Here's a full suggested itinerary made for you:</h2>
        {apiResponse.destination.itinerary.map((day, index) => {
          return (
            <>
              {/* TODO: NEED TO REVISE THE STRUCTURE OF THE ITINERARY OBJECT, OR FIGURE OUT HOW TO DISPLAY THE DATA IN DAY */}
              <li key={`${day.summary} - ${index}`}>
                <span
                  style={{ fontWeight: "bold" }}
                >{`Day ${day.day_num}`}</span>
                : {day.plan}
              </li>
            </>
          );
        })}
      </div>
    </>
  );
}

export default Results_Full_Known;
