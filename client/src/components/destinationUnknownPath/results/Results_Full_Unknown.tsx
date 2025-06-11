import destinationImage from "../../../assets/output.png";
import secondDestinationImage from "../../../assets/output2.png";
import { apiResponse } from "../../../types/types";

type ResultsProps = {
  apiResponse: apiResponse;
};

function Results_Full_Unknown({ apiResponse }: ResultsProps) {
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
                <li key={`${place.name} - ${index}`}>
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
                <li key={`${destination.destination_name} - ${index}`}>
                  <span style={{ fontWeight: "bold" }}>
                    {destination.destination_name}
                  </span>
                  : {destination.description}
                </li>
              </>
            );
          })}
          <div className="resultsInfoBox">
            <h2 style={{ textAlign: "center" }}>
              Some important things to plan for:
            </h2>

            <li>
              <span style={{ fontWeight: "bold" }}>Best time to go:</span>{" "}
              {apiResponse?.destination.time_to_go}
            </li>
            <li>
              <span style={{ fontWeight: "bold" }}>Estimated cost:</span>{" "}
              {apiResponse?.destination.estimated_cost}
            </li>
            <li>
              <span style={{ fontWeight: "bold" }}>Other tips:</span>{" "}
              {apiResponse?.destination.helpful_tips}
            </li>
          </div>
          <div className="resultsItineraryContainer">
            <h2>Here's an itinerary made for you:</h2>
            {apiResponse.destination.itinerary.map((day, index) => {
              return (
                <>
                  <h3
                    style={{
                      alignSelf: "flex-start",
                      margin: "10px 0 5px 0",
                      color: "var(--teal)",
                    }}
                  >{`Day ${day.day_num}: ${day.summary}`}</h3>
                  <li key={`${day.day_num} - morning - ${index}`}>
                    {day.morning}
                  </li>
                  <li key={`${day.day_num} - afternoon - ${index}`}>
                    {day.afternoon}
                  </li>
                  <li key={`${day.day_num} - evening - ${index}`}>
                    {day.evening}
                  </li>
                </>
              );
            })}
          </div>
        </div>
      </div>
      {/* Second destination */}

      <div className="resultContentContainer">
        <h2 style={{ color: "var(--action-coral)" }}>
          Here's another recommendation (it's good to have options, right?)
        </h2>
        <div className="resultsFullContentContainer">
          <h1>{apiResponse?.second_destination.location}</h1>
          <p className="resultsFullDescription">
            {apiResponse?.second_destination.overview}
          </p>
          <img src={secondDestinationImage} alt="" className="locationImage" />
          <h2>Where to stay:</h2>

          {apiResponse?.second_destination.places_to_stay.map(
            (place, index) => {
              return (
                <>
                  <li key={`${place.name} - ${index}`}>
                    <span style={{ fontWeight: "bold" }}>{place.name}</span> in{" "}
                    {place.location}: {place.why_recommended}.{" "}
                    {place.price_range}.
                  </li>
                </>
              );
            }
          )}

          <h2>Here are some things to do while you're there:</h2>
          {apiResponse?.second_destination.things_to_do.map(
            (destination, index) => {
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
            }
          )}
          <div className="resultsInfoBox">
            <h2 style={{ textAlign: "center" }}>
              Some important things to plan for:
            </h2>

            <li>
              <span style={{ fontWeight: "bold" }}>Best time to go:</span>{" "}
              {apiResponse?.second_destination.time_to_go}
            </li>
            <li>
              <span style={{ fontWeight: "bold" }}>Estimated cost:</span>{" "}
              {apiResponse?.second_destination.estimated_cost}
            </li>
            <li>
              <span style={{ fontWeight: "bold" }}>Other tips:</span>{" "}
              {apiResponse?.second_destination.helpful_tips}
            </li>
          </div>
          <div className="resultsItineraryContainer">
            <h2>Here's an itinerary made for you:</h2>
            {apiResponse.second_destination.itinerary.map((day, index) => {
              return (
                <>
                  <h3
                    style={{
                      alignSelf: "flex-start",
                      margin: "10px 0 5px 0",
                      color: "var(--teal)",
                    }}
                  >{`Day ${day.day_num}: ${day.summary}`}</h3>
                  <li key={`${day.day_num} - morning - ${index}`}>
                    {day.morning}
                  </li>
                  <li key={`${day.day_num} - afternoon - ${index}`}>
                    {day.afternoon}
                  </li>
                  <li key={`${day.day_num} - evening - ${index}`}>
                    {day.evening}
                  </li>
                </>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default Results_Full_Unknown;
