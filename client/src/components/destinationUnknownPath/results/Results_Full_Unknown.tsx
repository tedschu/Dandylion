import destinationImage from "../../../assets/output.png";
import secondDestinationImage from "../../../assets/output2.png";
import { Plan, Destination } from "../../../types/types";
import ShareIcon from "@mui/icons-material/Share";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { useAppContext } from "../../../contexts/AppContext";
import SharePlan from "../../SharePlan";
import { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import { Link } from "react-router-dom";
import EditPlan from "../../EditPlan";

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
    setPlan,
    revisedPlan,
    setRevisedPlan,
    isEditModalOpen,
    setIsEditModalOpen,
  } = useAppContext();

  const storedToken = localStorage.getItem("token");
  const [showShareButton, setShowShareButton] = useState(true);

  const user_id = localStorage.getItem("userId");

  const [isSecondPlanLoading, setIsSecondPlanLoading] = useState(true);

  const openSharePlan = (
    id: number,
    destination: string,
    second_destination: string,
    imageUrl: string
  ) => {
    // Update planID state value
    // Open modal with SharePlan component

    setPlanShareData((prevState) => ({
      ...prevState,
      planID: id,
      destination: destination,
      second_destination: second_destination,
      imageUrl: imageUrl,
    }));
    setIsShareModalOpen(true);
  };

  const openEditModal = (id: number, planData: Destination) => {
    setRevisedPlan((prevState) => ({
      ...prevState,
      plan_id: id,
      plan_data: planData,
      plan_type: "DESTINATION_UNKNOWN",
      plan_key: "destination",
      user_feedback: "",
    }));

    setIsEditModalOpen(true);
  };

  // If the user did not create the plan, do not show the share button
  useEffect(() => {
    if (user_id !== null && parseInt(user_id) !== plan.user_id) {
      setShowShareButton(false);
    }
  }, []);

  // useEffect to trigger re-render when second_destination data is updated in Plan state
  useEffect(() => {
    // if second_destination already is populated, return (do nothing else)
    if (plan?.plan_data.second_destination?.location) {
      setIsSecondPlanLoading(false);
      return;
    }

    const interval = setInterval(async () => {
      try {
        const response = await fetch(`/api/plans/${planID}`, {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${storedToken}`,
          },
        });

        const data = await response.json();

        if (data) {
          setPlan(data.plan);
          setIsSecondPlanLoading(false);
        }
      } catch (error) {}
    }, 20000);

    const timeout = setTimeout(() => {
      clearInterval(interval);
    }, 120000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  console.log(plan.plan_data);

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
        {isEditModalOpen && <EditPlan />}

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
                    plan.plan_data.second_destination.location,
                    plan.photos_first_destination[0]
                  )
                }
              >
                <ShareIcon sx={{ fontSize: "large" }} />
              </button>
              <button
                type="button"
                className="icons"
                onClick={() =>
                  openEditModal(planID, plan.plan_data.destination)
                }
              >
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
                    {place.location}: {place.why_recommended}.{" "}
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
                    ({place.restaurant_type}): {place.description}.
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
                        </div>
                        <div className="lineDivider"></div>
                        <div className="itineraryListItemContent">
                          <p className="itinerary-unknown-p-mod">
                            {day.morning}
                          </p>
                        </div>
                      </div>
                      <div className="itineraryDayListItemContainer">
                        <div className="itineraryListItemTime">
                          <h4 className="resultsItineraryH4">Afternoon</h4>
                        </div>
                        <div className="lineDivider"></div>
                        <div className="itineraryListItemContent">
                          <p className="itinerary-unknown-p-mod">
                            {day.afternoon}
                          </p>
                        </div>
                      </div>
                      <div className="itineraryDayListItemContainer">
                        <div className="itineraryListItemTime">
                          <h4 className="resultsItineraryH4">Evening</h4>
                        </div>
                        <div className="lineDivider"></div>
                        <div className="itineraryListItemContent">
                          <p className="itinerary-unknown-p-mod">
                            {day.evening}
                          </p>
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
      {/* Second destination */}

      {isSecondPlanLoading && (
        <>
          <div className="secondDestinationLoading">
            <p>Loading a second destination...</p>
            <CircularProgress />
          </div>
        </>
      )}

      {/* Only renders if second_destination has data in object (error handling) */}
      {plan?.plan_data.second_destination?.location && (
        <>
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
                        plan.plan_data.second_destination.location,
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
            <h2 style={{ color: "var(--action-coral)", fontSize: "16px" }}>
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

              <div className="planContentBlock">
                <h2>Where to stay:</h2>
                {plan?.plan_data.second_destination.places_to_stay.map(
                  (place, index) => {
                    return (
                      <>
                        <li key={`${place.name} - ${index}`}>
                          <span style={{ fontWeight: "bold" }}>
                            {place.name}
                          </span>{" "}
                          in {place.location}: {place.why_recommended}.{" "}
                          {place.price_range}.
                        </li>
                      </>
                    );
                  }
                )}
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
                        ({place.restaurant_type}): {place.description}.
                      </li>
                    </>
                  );
                })}
              </div>

              <div className="planContentBlock">
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
              </div>

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
                              </div>
                              <div className="lineDivider"></div>
                              <div className="itineraryListItemContent">
                                <p className="itinerary-unknown-p-mod">
                                  {day.morning}
                                </p>
                              </div>
                            </div>
                            <div className="itineraryDayListItemContainer">
                              <div className="itineraryListItemTime">
                                <h4 className="resultsItineraryH4">
                                  Afternoon
                                </h4>
                              </div>
                              <div className="lineDivider"></div>
                              <div className="itineraryListItemContent">
                                <p className="itinerary-unknown-p-mod">
                                  {day.afternoon}
                                </p>
                              </div>
                            </div>
                            <div className="itineraryDayListItemContainer">
                              <div className="itineraryListItemTime">
                                <h4 className="resultsItineraryH4">Evening</h4>
                              </div>
                              <div className="lineDivider"></div>
                              <div className="itineraryListItemContent">
                                <p className="itinerary-unknown-p-mod">
                                  {day.evening}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
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
