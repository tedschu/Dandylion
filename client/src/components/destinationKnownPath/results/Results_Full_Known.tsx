import destinationImage from "../../../assets/output.png";
import { apiResponseKnown } from "../../../types/types";
import ShareIcon from "@mui/icons-material/Share";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { useAppContext } from "../../../contexts/AppContext";
import SharePlan from "../../SharePlan";

type ResultsProps = {
  apiResponse: apiResponseKnown;
  planID: number;
};

function Results_Full_Known({ apiResponse, planID }: ResultsProps) {
  const {
    isShareModalOpen,
    setIsShareModalOpen,
    planShareData,
    setPlanShareData,
  } = useAppContext();

  const openSharePlan = (id: number, destination: string) => {
    // Update planID state value
    // Open modal with SharePlan component

    setPlanShareData((prevState) => ({
      ...prevState,
      planID: id,
      destination: destination,
    }));
    setIsShareModalOpen(true);
  };

  console.log(apiResponse);

  return (
    <>
      <div className="resultContentContainer">
        {isShareModalOpen && <SharePlan />}
        <button
          type="button"
          className="shareTest"
          onClick={() =>
            openSharePlan(planID, apiResponse.destination.location)
          }
        >
          <ShareIcon sx={{ fontSize: "medium" }} />
        </button>
        <button type="button" className="shareTest2">
          <ModeEditIcon sx={{ fontSize: "medium" }} />
        </button>
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
                  <h4 className="resultsItineraryH4">
                    Morning ({day.morning.time})
                  </h4>
                  <li>Activities: {day.morning.activities}</li>
                  <li>Dining: {day.morning.dining}</li>
                  <h4 className="resultsItineraryH4">
                    Afternoon ({day.afternoon.time})
                  </h4>
                  <li>Activities: {day.afternoon.activities}</li>
                  <li>Dining: {day.afternoon.dining}</li>
                  <h4 className="resultsItineraryH4">
                    Evening ({day.evening.time})
                  </h4>
                  <li>Activities: {day.evening.activities}</li>
                  <li>Dining: {day.evening.dining}</li>
                </>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default Results_Full_Known;
