import { useEffect, useState } from "react";
import Header from "../components/Header";
import { useAuth } from "../contexts/AuthContext";
import { useAppContext } from "../contexts/AppContext";
import { useNavigate } from "react-router-dom";
import { h2, span } from "motion/react-client";
import testIMage from "../assets/images/destinations/italy.png";
import SharePlan from "../components/SharePlan";

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
  plan_data: {
    destination: {
      location: string;
    };
    second_destination: {
      location: string;
    };
  };
  plan_type: string;
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

      if (data) {
        setUserSharedPlans(data.plansFormattedDates);
      }
    } catch (error) {
      console.error("Error getting user's shared plans:", error);
    }
  };

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

  console.log(userPlans);

  return (
    <>
      <div className="myAccountContainer">
        <Header />

        <div className="myAccountContentContainer">
          {userPlans.length > 0 && (
            <>
              <h1 style={{ color: "white", textAlign: "center" }}>
                Hey there! Here are the plans you've purchased:
              </h1>

              {userPlans.map((plan, index) => {
                return (
                  <div className="myAccountPlanContainer" key={index}>
                    <div style={{ display: "flex", gap: "10px" }}>
                      {/* TODO: CAN MODIFY TO SHOW TWO IMAGES IF AVAIALBLE, OR JUST DEFAULT TO FIRST */}
                      <img
                        src={plan.photos_first_destination[0]}
                        alt=""
                        style={{
                          maxWidth: "100px",
                          height: "auto",
                          objectFit: "contain",
                        }}
                      />
                      <div className="myAccountPlanText">
                        <h2>{plan.plan_data.destination.location}</h2>
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
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px",
                      }}
                    >
                      <button
                        className="register"
                        onClick={() => navigate(`/plans/${plan.id}`)}
                      >
                        View plan
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          openSharePlan(
                            plan.id,
                            plan.plan_data.destination.location
                          )
                        }
                      >
                        Share plan
                      </button>
                    </div>
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
            </>
          )}

          {userSharedPlans.length > 0 && (
            <>
              <h1 style={{ color: "white", textAlign: "center" }}>
                Here are the plans that have been shared with you:
              </h1>

              {userSharedPlans.map((plan, index) => {
                return (
                  <div className="myAccountPlanContainer" key={index}>
                    <div style={{ display: "flex", gap: "10px" }}>
                      <img
                        src={testIMage}
                        alt=""
                        style={{
                          maxWidth: "100px",
                          height: "auto",
                          objectFit: "contain",
                        }}
                      />
                      <div className="myAccountPlanText">
                        <h2>{plan.plan_data.destination.location}</h2>
                        {plan.plan_data.second_destination && (
                          <h2> {plan.plan_data.second_destination.location}</h2>
                        )}
                        <p>Created on: {plan.created_at.split(",")[0]}</p>
                        <p>
                          Shared by: {plan.invited_by_name} (
                          {plan.invited_by_email})
                        </p>
                      </div>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px",
                      }}
                    >
                      <button
                        className="register"
                        onClick={() => navigate(`/plans/${plan.id}`)}
                      >
                        View plan
                      </button>
                    </div>
                  </div>
                );
              })}
            </>
          )}

          <button className="login" onClick={() => navigate("/")}>
            Go home
          </button>
          {isShareModalOpen && <SharePlan />}
        </div>
      </div>
    </>
  );
}

export default Me;
