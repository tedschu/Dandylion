import { useEffect, useState } from "react";
import Header from "../components/Header";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { h2 } from "motion/react-client";
import testIMage from "../assets/images/destinations/italy.png";

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
  // add other properties if needed
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

      console.log(data);

      if (data) {
        setUserPlans(data.plansFormattedDates);
      }
    } catch (error) {}
  };

  console.log(userPlans);

  return (
    <>
      <div className="myAccountContainer">
        <Header />
        <h1 style={{ color: "white", textAlign: "center" }}>
          Hey there, {userInfo.firstName}. Here are the plans you've purchased:
        </h1>

        {userPlans.map((plan) => {
          return (
            <>
              <div className="myAccountContentContainer">
                <img src={testIMage} alt="" style={{ width: "80px" }} />
                <div>
                  <h2>{plan.result_data.destination.location}</h2>
                  {plan.result_data.second_destination && (
                    <h2> {plan.result_data.second_destination.location}</h2>
                  )}
                  <p>Created on: {plan.created_at.split(",")[0]}</p>
                </div>
                <button>View plan</button>
              </div>
            </>
          );
        })}

        <button onClick={() => navigate("/")}>Go home</button>
      </div>
    </>
  );
}

export default Me;
