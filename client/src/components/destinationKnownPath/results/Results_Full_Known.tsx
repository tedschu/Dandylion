import { PlanKnown } from "../../../types/types";
import ShareIcon from "@mui/icons-material/Share";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { useAppContext } from "../../../contexts/AppContext";
import SharePlan from "../../SharePlan";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

type ResultsProps = {
  plan: PlanKnown;
  planID: number;
};

function Results_Full_Known({ plan, planID }: ResultsProps) {
  const {
    isShareModalOpen,
    setIsShareModalOpen,
    planShareData,
    setPlanShareData,
  } = useAppContext();
  const [showShareButton, setShowShareButton] = useState(true);

  const storedToken = localStorage.getItem("token");
  const user_id = localStorage.getItem("userId");

  const openSharePlan = (id: number, destination: string, imageUrl: string) => {
    // Update planID state value
    // Open modal with SharePlan component

    setPlanShareData((prevState) => ({
      ...prevState,
      planID: id,
      destination: destination,
      second_destination: "",
      imageUrl: imageUrl,
    }));
    setIsShareModalOpen(true);
  };

  // If the user did not create the plan, do not show the share button
  useEffect(() => {
    if (user_id !== null && parseInt(user_id) !== plan.user_id) {
      setShowShareButton(false);
    }
  }, []);

  return (
    <>
      {/* **** EARLY TESTER SURVEY LINK - DELETE PRIOR TO FULL DEPLOY */}
      <Link
        to={
          "https://docs.google.com/forms/d/e/1FAIpQLSe1BkGol0V4q5MdvmR_iSt1dHKmLi-BRJYgNuEuyjSaduwFAQ/viewform?usp=header"
        }
      >
        <div
          className="betaFeedbackBanner"
          style={{
            position: "absolute",
            top: "10px",
            left: "10px",
            color: "black",
            fontSize: "12px",
            backgroundColor: "yellow",
            width: "140px",
            padding: "2px",
            zIndex: "1001",
            cursor: "pointer",
          }}
        >
          Hey, early testers! Click here to share your feedback.
        </div>
      </Link>
      <div className="resultContentContainer">
        {isShareModalOpen && <SharePlan />}
        {showShareButton && (
          <>
            <div className="iconsContainer">
              <button
                type="button"
                className="icons"
                onClick={() =>
                  openSharePlan(
                    planID,
                    plan.plan_data.destination.location,
                    plan.photos_first_destination[0]
                  )
                }
              >
                <ShareIcon sx={{ fontSize: "large" }} />
              </button>
              <button type="button" className="icons">
                <ModeEditIcon sx={{ fontSize: "large" }} />
              </button>
            </div>
          </>
        )}
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
          <div className="planContentBlock">
            <h2>Where to stay:</h2>

            {plan?.plan_data.destination.places_to_stay.map((place, index) => {
              return (
                <>
                  <li key={`${place.name} - ${index}`}>
                    <span style={{ fontWeight: "bold" }}>{place.name}</span> in{" "}
                    {place.location}: {place.why_recommended}{" "}
                    {place.price_range}.
                  </li>
                </>
              );
            })}
          </div>

          <div className="planContentBlock">
            <h2>Places to eat:</h2>

            {plan?.plan_data.destination.restaurants.map((place, index) => {
              return (
                <>
                  <li key={`${place.restaurant_name} - ${index}`}>
                    <span style={{ fontWeight: "bold" }}>
                      {place.restaurant_name}
                    </span>{" "}
                    ({place.restaurant_type}): {place.description}
                  </li>
                </>
              );
            })}
          </div>

          <div className="planContentBlock">
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
          </div>

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
                  <div className="itineraryDayContainer" key={index}>
                    <div className="itineraryDayHeader">
                      <h3
                        style={{
                          margin: "10px 0 5px 0",
                          color: "var(--teal)",
                          fontSize: "22px",
                        }}
                      >{`Day ${day.day_num}: ${day.summary}`}</h3>
                    </div>
                    <div className="itineraryDayListContainer">
                      <div className="itineraryDayListItemContainer">
                        <div className="itineraryListItemTime">
                          <h4 className="resultsItineraryH4">Morning</h4>
                          <p>{day.morning.time}</p>
                        </div>
                        <div className="lineDivider"></div>
                        <div className="itineraryListItemContent">
                          <li> Activities: {day.morning.activities}</li>
                          <li>Dining: {day.morning.dining}</li>
                        </div>
                      </div>
                      <div className="itineraryDayListItemContainer">
                        <div className="itineraryListItemTime">
                          <h4 className="resultsItineraryH4">Afternoon</h4>
                          <p>{day.afternoon.time}</p>
                        </div>
                        <div className="lineDivider"></div>
                        <div className="itineraryListItemContent">
                          <li>Activities: {day.afternoon.activities}</li>
                          <li>Dining: {day.afternoon.dining}</li>
                        </div>
                      </div>
                      <div className="itineraryDayListItemContainer">
                        <div className="itineraryListItemTime">
                          <h4 className="resultsItineraryH4">Evening</h4>
                          <p>{day.evening.time}</p>
                        </div>
                        <div className="lineDivider"></div>
                        <div className="itineraryListItemContent">
                          <li>Activities: {day.evening.activities}</li>
                          <li>Dining: {day.evening.dining}</li>
                        </div>
                      </div>
                    </div>
                  </div>
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
