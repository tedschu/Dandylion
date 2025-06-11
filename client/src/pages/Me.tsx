import { useEffect, useState } from "react";
import Header from "../components/Header";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { h2 } from "motion/react-client";
import testIMage from "../assets/images/destinations/italy.png";
import { apiResponse } from "../types/types";
import SharePlan from "../components/SharePlan";

type Plan = {
  result_data: {
    destination: {
      location: string;
    };
    second_destination: {
      location: string;
    };
    // add other properties if needed
  };
  plan_type: string;
  created_at: string;
  id: number;
  // add other properties if needed
};

type PlanResultsProps = {
  result_data: apiResponse;
  plan_type: string;
};

function Me() {
  const { userInfo } = useAuth();
  const storedToken = localStorage.getItem("token");
  const [userPlans, setUserPlans] = useState<Plan[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    getUserPlans();
  }, []);

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
    } catch (error) {}
  };

  return (
    <>
      <div className="myAccountContainer">
        <Header />

        <div className="myAccountContentContainer">
          <h1 style={{ color: "white", textAlign: "center" }}>
            Hey there! Here are the plans you've purchased:
          </h1>

          {userPlans.map((plan) => {
            return (
              <div className="myAccountPlanContainer">
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
                  <div>
                    <h2>{plan.result_data.destination.location}</h2>
                    {plan.result_data.second_destination && (
                      <h2> {plan.result_data.second_destination.location}</h2>
                    )}
                    <p>Created on: {plan.created_at.split(",")[0]}</p>
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
                  <button>Share plan</button>
                </div>
              </div>
            );
          })}

          <h1>TODO: ADD PLANS THAT HAVE BEEN SHARED WITH YOU</h1>
          <button className="login" onClick={() => navigate("/")}>
            Go home
          </button>
          {/* TEMPORARY FOR TESTING - REMOVE */}
          <SharePlan />
        </div>
      </div>
    </>
  );
}

export default Me;
