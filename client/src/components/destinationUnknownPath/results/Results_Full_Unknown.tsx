import destinationImage from "../../../assets/output.png";
import secondDestinationImage from "../../../assets/output2.png";
import { Plan } from "../../../types/types";
import ShareIcon from "@mui/icons-material/Share";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { useAppContext } from "../../../contexts/AppContext";
import SharePlan from "../../SharePlan";

type ResultsProps = {
  plan: Plan;
  planID: number;
};

function Results_Full_Unknown({ plan, planID }: ResultsProps) {
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

  console.log(plan);

  return (
    <>
      <div className="resultContentContainer">
        {isShareModalOpen && <SharePlan />}
        <button
          type="button"
          className="shareTest"
          onClick={() =>
            openSharePlan(planID, plan.plan_data.destination.location)
          }
        >
          <ShareIcon sx={{ fontSize: "medium" }} />
        </button>
        <button type="button" className="shareTest2">
          <ModeEditIcon sx={{ fontSize: "medium" }} />
        </button>
        <div className="resultsFullContentContainer">
          <h1>{plan?.plan_data.destination.location}</h1>
          <p className="resultsFullDescription">
            {plan?.plan_data.destination.overview}
          </p>
          <img
            src={plan.photos_first_destination[0]}
            alt=""
            className="locationImage"
          />
          <h2>Where to stay:</h2>

          {plan?.plan_data.destination.places_to_stay.map((place, index) => {
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
          {plan?.plan_data.destination.things_to_do.map(
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
              {plan?.plan_data.destination.time_to_go}
            </li>
            <li>
              <span style={{ fontWeight: "bold" }}>Estimated cost:</span>{" "}
              {plan?.plan_data.destination.estimated_cost}
            </li>
            <li>
              <span style={{ fontWeight: "bold" }}>Other tips:</span>{" "}
              {plan?.plan_data.destination.helpful_tips}
            </li>
          </div>
          <div className="resultsItineraryContainer">
            <h2>Here's an itinerary made for you:</h2>
            {plan.plan_data.destination.itinerary.map((day, index) => {
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
      {/* Only renders if second_destination has data in object (error handling) */}
      {plan?.plan_data.second_destination?.location && (
        <>
          <div className="resultContentContainer">
            <h2 style={{ color: "var(--action-coral)" }}>
              Here's another recommendation (it's good to have options, right?)
            </h2>
            <div className="resultsFullContentContainer">
              <h1>{plan?.plan_data.second_destination.location}</h1>
              <p className="resultsFullDescription">
                {plan?.plan_data.second_destination.overview}
              </p>
              <img
                src={plan.photos_second_destination[0]}
                alt=""
                className="locationImage"
              />
              <h2>Where to stay:</h2>

              {plan?.plan_data.second_destination.places_to_stay.map(
                (place, index) => {
                  return (
                    <>
                      <li key={`${place.name} - ${index}`}>
                        <span style={{ fontWeight: "bold" }}>{place.name}</span>{" "}
                        in {place.location}: {place.why_recommended}.{" "}
                        {place.price_range}.
                      </li>
                    </>
                  );
                }
              )}

              <h2>Here are some things to do while you're there:</h2>
              {plan?.plan_data.second_destination.things_to_do.map(
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
                  {plan?.plan_data.second_destination.time_to_go}
                </li>
                <li>
                  <span style={{ fontWeight: "bold" }}>Estimated cost:</span>{" "}
                  {plan?.plan_data.second_destination.estimated_cost}
                </li>
                <li>
                  <span style={{ fontWeight: "bold" }}>Other tips:</span>{" "}
                  {plan?.plan_data.second_destination.helpful_tips}
                </li>
              </div>
              <div className="resultsItineraryContainer">
                <h2>Here's an itinerary made for you:</h2>
                {plan.plan_data.second_destination.itinerary.map(
                  (day, index) => {
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
                  }
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Results_Full_Unknown;
