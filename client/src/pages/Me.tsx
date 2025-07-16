import { useEffect, useState } from "react";
import Header from "../components/Header";
import { useAuth } from "../contexts/AuthContext";
import { useAppContext } from "../contexts/AppContext";
import { useNavigate } from "react-router-dom";
import { h2, span } from "motion/react-client";
import testIMage from "../assets/images/destinations/italy.png";
import SharePlan from "../components/SharePlan";
import ShareIcon from "@mui/icons-material/Share";
import DandelionSeedsCSS from "../components/DandelionSeedsCSS";

type Plan = {
  plan_data: {
    destination: {
      location: string;
    };
    second_destination: {
      location: string;
    };
  };
  plan_type: string;
  photos_first_destination: string[];
  photos_second_destination: string[];
  created_at: string;
  id: number;
  shared_with: [];
};

type SharedPlan = {
  plan_type: string;
  plan_data: {
    destination: {
      location: string;
    };
    second_destination: {
      location: string;
    };
  };
  photos_first_destination: string[];
  photos_second_destination: string[];
  created_at: string;
  id: number;
  invited_by_email: string;
  invited_by_name: string;
};

function Me() {
  const { userInfo } = useAuth();
  const {
    planShareData,
    setPlanShareData,
    isShareModalOpen,
    setIsShareModalOpen,
    shouldRefreshPlans,
    setShouldRefreshPlans,
  } = useAppContext();
  const storedToken = localStorage.getItem("token");
  const [userPlans, setUserPlans] = useState<Plan[]>([]);
  const [userSharedPlans, setUserSharedPlans] = useState<SharedPlan[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    getUserPlans();
    getUserSharedPlans();
  }, []);

  useEffect(() => {
    if (shouldRefreshPlans) {
      getUserPlans();
      setShouldRefreshPlans(false);
    }
  }, [shouldRefreshPlans]);

  // Gets all plans created by the user
  const getUserPlans = async () => {
    try {
      const response = await fetch("/api/users/my-plans", {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${storedToken}`,
        },
      });

      const data = await response.json();

      if (data) {
        setUserPlans(data.plansFormattedDates);
      }
    } catch (error) {
      console.error("Error getting user's plans:", error);
    }
  };

  // Gets all plans that were shared with the user
  const getUserSharedPlans = async () => {
    try {
      const response = await fetch("/api/users/plans-shared-with-me", {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${storedToken}`,
        },
      });

      const data = await response.json();

      console.log("here is data within getUserSharedPlans:", data);

      if (data) {
        setUserSharedPlans(data.plansFormattedDates);
      }
    } catch (error) {
      console.error("Error getting user's shared plans:", error);
    }
  };

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

  console.log(userSharedPlans, userPlans);

  return (
    <>
      <div className="myAccountContainer">
        <Header variant="header-relative" />

        <div className="myAccountContentContainer">
          {userPlans.length > 0 && (
            <>
              <h1 style={{ color: "white", textAlign: "center" }}>
                Here are the plans you've purchased:
              </h1>

              {userPlans.map((plan, index) => {
                return (
                  <div className="myAccountPlanContainer" key={index}>
                    <img
                      src={plan.photos_first_destination[0]}
                      alt=""
                      onClick={() => navigate(`/plans/${plan.id}`)}
                    />
                    <div className="myAccountPlanText">
                      <h2
                        style={{ cursor: "pointer" }}
                        onClick={() => navigate(`/plans/${plan.id}`)}
                      >
                        {plan.plan_data.destination.location}
                      </h2>
                      {plan.plan_data.second_destination && (
                        <h2>{plan.plan_data.second_destination.location}</h2>
                      )}

                      <p>Created on: {plan.created_at.split(",")[0]}</p>
                      {plan.shared_with.length > 0 && (
                        <p>
                          Shared with:{" "}
                          {plan.shared_with.map((email, index) => {
                            return <span key={index}>{email} </span>;
                          })}{" "}
                          {/* {plan.shared_with.length} others */}
                        </p>
                      )}
                    </div>

                    <button
                      type="button"
                      className="shareIconMePage"
                      onClick={() =>
                        openSharePlan(
                          plan.id,
                          plan.plan_data.destination.location,
                          plan.plan_data.second_destination
                            ? plan.plan_data.second_destination.location
                            : "",
                          plan.photos_first_destination[0]
                        )
                      }
                    >
                      <ShareIcon sx={{ fontSize: "large" }} />
                    </button>
                  </div>
                );
              })}
            </>
          )}

          {userPlans.length === 0 && (
            <>
              <h1
                style={{
                  color: "white",
                  textAlign: "center",
                }}
              >
                Looks like you haven't created any plans just yet.
              </h1>
              <button
                className="register"
                onClick={() => navigate("/path")}
                style={{ marginBottom: "10px" }}
              >
                Create a plan
              </button>

              <button className="register" onClick={() => navigate("/")}>
                Go home
              </button>
            </>
          )}

          {userSharedPlans.length > 0 && (
            <>
              <h1
                style={{
                  color: "white",
                  textAlign: "center",
                  marginTop: "35px",
                }}
              >
                Here are the plans that have been shared with you:
              </h1>

              {userSharedPlans.map((plan, index) => {
                return (
                  <div className="myAccountPlanContainer" key={index}>
                    <img
                      src={plan.photos_first_destination[0]}
                      alt=""
                      className="myAccountPlanImage"
                      onClick={() => navigate(`/plans/${plan.id}`)}
                    />
                    <div className="myAccountPlanText">
                      <h2
                        style={{ cursor: "pointer" }}
                        onClick={() => navigate(`/plans/${plan.id}`)}
                      >
                        {plan.plan_data.destination.location}
                      </h2>
                      {plan.plan_data.second_destination && (
                        <h2> {plan.plan_data.second_destination.location}</h2>
                      )}
                      <p>Created on: {plan.created_at.split(",")[0]}</p>
                      <p>
                        Shared by: {plan.invited_by_name} (
                        {plan.invited_by_email})
                      </p>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px",
                      }}
                    ></div>
                  </div>
                );
              })}
            </>
          )}

          {isShareModalOpen && <SharePlan />}
        </div>
      </div>
    </>
  );
}

export default Me;
